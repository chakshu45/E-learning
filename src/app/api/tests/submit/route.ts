import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Question from "@/models/Question";
import TestAttempt from "@/models/TestAttempt";
import { requireAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const auth = await requireAuth(req);
    if (auth.errorResponse) return auth.errorResponse;

    const { subject, difficulty, answers, timeTaken } = await req.json();

    let correctAnswersCount = 0;
    const totalQuestions = Array.isArray(answers) ? answers.length : 0;
    const processedAnswers = [];

    for (const ans of answers || []) {
      const question = await Question.findById(ans.questionId);
      if (question) {
        const isCorrect = question.correctAnswer === ans.selectedOption;
        if (isCorrect) correctAnswersCount++;
        processedAnswers.push({
          question: question._id,
          selectedOption: ans.selectedOption,
          isCorrect,
        });
      }
    }

    const wrongAnswersCount = totalQuestions - correctAnswersCount;
    const score = correctAnswersCount * 4;
    const accuracy = totalQuestions > 0 ? (correctAnswersCount / totalQuestions) * 100 : 0;

    const attempt = await TestAttempt.create({
      user: auth.user._id,
      subject: subject || "General",
      difficulty: difficulty || "Medium",
      score,
      totalQuestions,
      correctAnswersCount,
      wrongAnswersCount,
      accuracy,
      timeTaken: timeTaken || 0,
      answers: processedAnswers,
    });

    return NextResponse.json(attempt, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to submit test" },
      { status: 500 }
    );
  }
}
