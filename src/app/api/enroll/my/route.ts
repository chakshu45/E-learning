import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import Course from "@/models/Course"; // Ensure model is registered
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    // Reference Course so Mongoose registers it for population
    void Course;
    const auth = await requireAuth(req);
    if (auth.errorResponse) return auth.errorResponse;

    const enrollments = await Enrollment.find({ user: auth.user._id }).populate("course");
    return NextResponse.json(enrollments);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch enrollments" },
      { status: 500 }
    );
  }
}
