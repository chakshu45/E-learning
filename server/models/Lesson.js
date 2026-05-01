const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    course: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course', 
        required: true 
    },
    title: { type: String, required: true },
    content: { type: String },
    videoUrl: { type: String, required: true },
    order: { type: Number, required: true },
    duration: { type: String, default: '0:00' }, // e.g. "10:30"
    challenge: {
        type: { type: String, enum: ['typing', 'drag-drop'] },
        question: { type: String },
        codeTemplate: { type: String },
        correctAnswer: { type: String },
        options: [String],
    },
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
