import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import { requireAuth } from "@/lib/auth";
import mongoose from "mongoose";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const auth = await requireAuth(req);
    if (auth.errorResponse) return auth.errorResponse;

    const { id } = await params;
    const { lessonId, progress } = await req.json();

    const enrollment = await Enrollment.findOne({
      _id: id,
      user: auth.user._id,
    });

    if (!enrollment) {
      return NextResponse.json({ message: "Enrollment not found" }, { status: 404 });
    }

    if (lessonId && !enrollment.completedLessons.some((l) => l.toString() === lessonId)) {
      enrollment.completedLessons.push(new mongoose.Types.ObjectId(lessonId));
    }

    if (typeof progress === "number") {
      enrollment.progress = progress;
    }

    await enrollment.save();
    return NextResponse.json(enrollment);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to update progress" },
      { status: 500 }
    );
  }
}
