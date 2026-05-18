const mongoose = require('mongoose');

const testAttemptSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    subject: { type: String, required: true },
    difficulty: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswersCount: { type: Number, required: true },
    wrongAnswersCount: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    timeTaken: { type: Number, required: true }, // In seconds
    answers: [{
        question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
        selectedOption: { type: Number },
        isCorrect: { type: Boolean }
    }],
    status: { 
        type: String, 
        enum: ['completed', 'aborted'], 
        default: 'completed' 
    }
}, { timestamps: true });

module.exports = mongoose.model('TestAttempt', testAttemptSchema);
