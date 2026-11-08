import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lesson from "@/models/Lesson";
import { requireAuth } from "@/lib/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ courseId: string }> }
) {
  try {
    await connectDB();
    const auth = await requireAuth(req);
    if (auth.errorResponse) return auth.errorResponse;

    const { courseId } = await params;
    const lessons = await Lesson.find({ course: courseId }).sort("order");
    return NextResponse.json(lessons);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch lessons" },
      { status: 500 }
    );
  }
}
