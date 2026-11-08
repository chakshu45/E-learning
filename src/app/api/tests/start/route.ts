import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Question from "@/models/Question";
import { requireAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const auth = await requireAuth(req);
    if (auth.errorResponse) return auth.errorResponse;

    const { subject, difficulty, limit = 10 } = await req.json();

    const query: Record<string, any> = {};
    if (subject) query.subject = subject;
    if (difficulty) query.difficulty = difficulty;

    const sampleSize = parseInt(String(limit), 10) || 10;

    let questions = await Question.aggregate([
      { $match: query },
      { $sample: { size: sampleSize } },
    ]);

    // If no questions match the exact difficulty, fallback to matching just the subject
    if (questions.length === 0 && subject) {
      questions = await Question.aggregate([
        { $match: { subject } },
        { $sample: { size: sampleSize } },
      ]);
    }

    // If still 0, grab random questions
    if (questions.length === 0) {
      questions = await Question.aggregate([
        { $sample: { size: sampleSize } },
      ]);
    }

    if (questions.length === 0) {
      return NextResponse.json(
        { message: "No questions found for the selected criteria." },
        { status: 404 }
      );
    }

    return NextResponse.json(questions);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to start test" },
      { status: 500 }
    );
  }
}
