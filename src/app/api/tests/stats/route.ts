import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TestAttempt from "@/models/TestAttempt";
import { requireAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const auth = await requireAuth(req);
    if (auth.errorResponse) return auth.errorResponse;

    const attempts = await TestAttempt.find({ user: auth.user._id }).sort({ createdAt: -1 });

    const totalAttempts = attempts.length;
    const highestScore = totalAttempts > 0 ? Math.max(...attempts.map((a) => a.score)) : 0;
    const averageAccuracy =
      totalAttempts > 0
        ? attempts.reduce((acc, curr) => acc + curr.accuracy, 0) / totalAttempts
        : 0;

    const recentHistory = attempts.slice(0, 5);

    const subjectStats = await TestAttempt.aggregate([
      { $match: { user: auth.user._id } },
      {
        $group: {
          _id: "$subject",
          avgScore: { $avg: "$score" },
          totalAttempts: { $sum: 1 },
        },
      },
    ]);

    return NextResponse.json({
      totalAttempts,
      highestScore,
      averageAccuracy,
      recentHistory,
      subjectStats,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to fetch test stats" },
      { status: 500 }
    );
  }
}
