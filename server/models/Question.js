const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    subject: { 
        type: String, 
        required: true,
        enum: [
            'Data Structures', 'Algorithms', 'Operating Systems', 'DBMS', 
            'Computer Networks', 'OOPs', 'Software Engineering', 
            'Web Development', 'Cloud Computing', 'Cyber Security'
        ]
    },
    difficulty: { 
        type: String, 
        required: true, 
        enum: ['Easy', 'Medium', 'Hard'],
        default: 'Easy'
    },
    text: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true }, // Index of the correct option
    explanation: { type: String },
    tags: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);
