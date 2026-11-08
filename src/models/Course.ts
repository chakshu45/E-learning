import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourse extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  subtitle?: string;
  description: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  instructor: mongoose.Types.ObjectId;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  numReviews: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    price: { type: Number, required: true, default: 0 },
    originalPrice: { type: Number },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: { type: String, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);

export default Course;
