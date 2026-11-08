import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Course from "@/models/Course";
import Enrollment from "@/models/Enrollment";
import { requireAuth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const auth = await requireAuth(req);
    if (auth.errorResponse) return auth.errorResponse;

    const { courseId } = await req.json();
    if (!courseId) {
      return NextResponse.json({ message: "Course ID is required" }, { status: 400 });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    const enrollmentExists = await Enrollment.findOne({
      user: auth.user._id,
      course: courseId,
    });

    if (enrollmentExists) {
      return NextResponse.json({ message: "Already enrolled" }, { status: 400 });
    }

    const enrollment = await Enrollment.create({
      user: auth.user._id,
      course: courseId,
      paymentStatus: "completed",
    });

    return NextResponse.json(enrollment, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Enrollment failed" },
      { status: 500 }
    );
  }
}
