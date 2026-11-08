import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestAttempt extends Document {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  subject: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  correctAnswersCount: number;
  wrongAnswersCount: number;
  accuracy: number;
  timeTaken: number;
  answers: {
    question: mongoose.Types.ObjectId;
    selectedOption: number;
    isCorrect: boolean;
  }[];
  status: "completed" | "aborted";
  createdAt: Date;
  updatedAt: Date;
}

const testAttemptSchema = new Schema<ITestAttempt>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: { type: String, required: true },
    difficulty: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswersCount: { type: Number, required: true },
    wrongAnswersCount: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    timeTaken: { type: Number, required: true },
    answers: [
      {
        question: { type: Schema.Types.ObjectId, ref: "Question" },
        selectedOption: { type: Number },
        isCorrect: { type: Boolean },
      },
    ],
    status: {
      type: String,
      enum: ["completed", "aborted"],
      default: "completed",
    },
  },
  { timestamps: true }
);

const TestAttempt: Model<ITestAttempt> =
  mongoose.models.TestAttempt || mongoose.model<ITestAttempt>("TestAttempt", testAttemptSchema);

export default TestAttempt;
