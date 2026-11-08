import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lesson from "@/models/Lesson";
import { requireAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const auth = await requireAuth(req, ["instructor", "admin"]);
    if (auth.errorResponse) return auth.errorResponse;

    const { course, title, content, videoUrl, order, duration, challenge } = await req.json();

    const lesson = await Lesson.create({
      course,
      title,
      content,
      videoUrl,
      order: order || 1,
      duration: duration || "10:00",
      challenge,
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create lesson" },
      { status: 500 }
    );
  }
}
