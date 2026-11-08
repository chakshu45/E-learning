import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Enrollment from "@/models/Enrollment";
import { requireAuth } from "@/lib/auth";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder";
const stripe = new Stripe(stripeKey, { apiVersion: "2025-01-27.acacia" as any });

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const auth = await requireAuth(req);
    if (auth.errorResponse) return auth.errorResponse;

    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json({ message: "Session ID is required" }, { status: 400 });
    }

    if (sessionId.startsWith("mock_session_")) {
      const enrollment = await Enrollment.findOneAndUpdate(
        { stripeSessionId: sessionId },
        { paymentStatus: "completed" },
        { new: true }
      );
      return NextResponse.json({ success: true, message: "Mock payment verified", enrollment });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const enrollment = await Enrollment.findOneAndUpdate(
        { stripeSessionId: sessionId },
        { paymentStatus: "completed" },
        { new: true }
      );

      if (!enrollment) {
        return NextResponse.json({ message: "Enrollment not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, enrollment });
    }

    return NextResponse.json({ success: false, message: "Payment not completed" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Payment verification failed" },
      { status: 500 }
    );
  }
}
