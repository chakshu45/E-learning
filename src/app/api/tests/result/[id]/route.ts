import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TestAttempt from "@/models/TestAttempt";
import Question from "@/models/Question";
import { requireAuth } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    // Reference Question model so Mongoose populates answers.question
    void Question;
    const auth = await requireAuth(req);
    if (auth.errorResponse) return auth.errorResponse;

    const { id } = await params;
    const attempt = await TestAttempt.findOne({
      _id: id,
      user: auth.user._id,
    }).populate("answers.question");

    if (!attempt) {
      return NextResponse.json({ message: "Test result not found" }, { status: 404 });
    }

    return NextResponse.json(attempt);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch test result" },
      { status: 500 }
    );
  }
}
