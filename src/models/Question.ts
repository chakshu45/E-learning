import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuestion extends Document {
  _id: mongoose.Types.ObjectId;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const questionSchema = new Schema<IQuestion>(
  {
    subject: {
      type: String,
      required: true,
      enum: [
        "Data Structures",
        "Algorithms",
        "Operating Systems",
        "DBMS",
        "Computer Networks",
        "OOPs",
        "Software Engineering",
        "Web Development",
        "Cloud Computing",
        "Cyber Security",
      ],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    text: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
    explanation: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Question: Model<IQuestion> =
  mongoose.models.Question || mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
