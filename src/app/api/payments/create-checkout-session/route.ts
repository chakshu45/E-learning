import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Course from "@/models/Course";
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

    const { courseId } = await req.json();
    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    const existingEnrollment = await Enrollment.findOne({
      user: auth.user._id,
      course: courseId,
      paymentStatus: "completed",
    });

    if (existingEnrollment) {
      return NextResponse.json({ message: "Already enrolled in this course" }, { status: 400 });
    }

    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";

    if (stripeKey === "sk_test_placeholder" || !process.env.STRIPE_SECRET_KEY) {
      const mockSessionId = `mock_session_${Date.now()}`;
      await Enrollment.findOneAndUpdate(
        { user: auth.user._id, course: courseId },
        {
          stripeSessionId: mockSessionId,
          paymentStatus: "pending",
        },
        { upsert: true, new: true }
      );

      const mockUrl = `${clientUrl}/payment/mock-checkout?course_id=${courseId}`;
      return NextResponse.json({ id: mockSessionId, url: mockUrl });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: course.title,
              description: course.subtitle,
              images: course.thumbnail ? [course.thumbnail] : [],
            },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}&course_id=${courseId}`,
      cancel_url: `${clientUrl}/courses/${courseId}`,
      metadata: {
        courseId: courseId.toString(),
        userId: auth.user._id.toString(),
      },
    });

    await Enrollment.findOneAndUpdate(
      { user: auth.user._id, course: courseId },
      {
        stripeSessionId: session.id,
        paymentStatus: "pending",
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
