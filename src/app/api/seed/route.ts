import { NextResponse } from "next/server";
import { seedAllData } from "@/lib/seedData";

export async function GET() {
  try {
    const result = await seedAllData(true);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to seed database" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const result = await seedAllData(true);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Failed to seed database" },
      { status: 500 }
    );
  }
}
