import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const msg = message.toLowerCase();
    let reply = "";

    if (msg.includes("hello") || msg.includes("hi")) {
      reply = "Hello! I'm SkyAI, your personal learning assistant. How can I help you today?";
    } else if (msg.includes("course") || msg.includes("learn")) {
      reply =
        "We have a wide range of premium courses including Full Stack MERN, Next.js, Spring Boot, and Computer Networks. You can explore them in the Courses section!";
    } else if (msg.includes("payment") || msg.includes("price")) {
      reply =
        "All our courses are priced affordably with lifetime access. We support card payments via Stripe and demo checkout. Check out any course to see details.";
    } else if (msg.includes("certificate")) {
      reply =
        "Yes! You receive an official Certificate of Completion with instant PDF download after completing 100% of any course.";
    } else if (msg.includes("who are you")) {
      reply =
        "I am SkyAI, designed to help you navigate LearnWithSky, master engineering topics, and answer technical questions.";
    } else if (msg.includes("practice") || msg.includes("test")) {
      reply =
        "Visit our Practice Arena to take timed or untimed mock tests across 10 core computer science and engineering subjects!";
    } else {
      reply =
        "That's a great question! I recommend exploring our Study Materials and Practice Arena for comprehensive roadmaps and deep-dive conceptual guides.";
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process chat message" },
      { status: 500 }
    );
  }
}
