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
}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);
