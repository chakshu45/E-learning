import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Course from "@/models/Course";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const courses = await Course.find({ isPublished: true }).populate("instructor", "name");
    return NextResponse.json(courses);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const auth = await requireAuth(req, ["instructor", "admin"]);
    if (auth.errorResponse) return auth.errorResponse;

    const { title, subtitle, description, price, originalPrice, category, level, thumbnail } =
      await req.json();

    const course = await Course.create({
      title,
      subtitle,
      description,
      price: price || 0,
      originalPrice,
      category,
      level: level || "Beginner",
      thumbnail: thumbnail || "",
      instructor: auth.user._id,
      isPublished: true,
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create course" },
      { status: 500 }
    );
  }
}
