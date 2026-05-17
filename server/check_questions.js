const mongoose = require('mongoose');
const Question = require('./models/Question');
require('dotenv').config();

const checkQuestions = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/elearning');
        const count = await Question.countDocuments();
        const subjects = await Question.distinct('subject');
        console.log(`Total Questions: ${count}`);
        console.log(`Subjects: ${subjects.join(', ')}`);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkQuestions();
