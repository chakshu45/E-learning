import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import { seedAllData } from "../src/lib/seedData";
import mongoose from "mongoose";

async function main() {
  console.log("Starting database seed script...");
  try {
    const res = await seedAllData(true);
    console.log("Database seeded successfully!", res);
  } catch (error) {
    console.error("Database seeding failed:", error);
    process.exit(1);
  } finally {
    try {
      await mongoose.disconnect();
    } catch {}
    process.exit(0);
  }
}

main();
