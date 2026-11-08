import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILesson extends Document {
  _id: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  title: string;
  content?: string;
  videoUrl: string;
  order: number;
  duration: string;
  challenge?: {
    type: "typing" | "drag-drop";
    question?: string;
    codeTemplate?: string;
    correctAnswer?: string;
    options?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const lessonSchema = new Schema<ILesson>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    title: { type: String, required: true },
    content: { type: String },
    videoUrl: { type: String, required: true },
    order: { type: Number, required: true },
    duration: { type: String, default: "0:00" },
    challenge: {
      type: { type: String, enum: ["typing", "drag-drop"] },
      question: { type: String },
      codeTemplate: { type: String },
      correctAnswer: { type: String },
      options: [String],
    },
  },
  { timestamps: true }
);

const Lesson: Model<ILesson> = mongoose.models.Lesson || mongoose.model<ILesson>("Lesson", lessonSchema);

export default Lesson;
