const Question = require('../models/Question');
const TestAttempt = require('../models/TestAttempt');

// @desc    Get questions for a practice test
// @route   POST /api/tests/start
// @access  Private
const startTest = async (req, res) => {
    const { subject, difficulty, limit = 10 } = req.body;

    try {
        const query = {};
        if (subject) query.subject = subject;
        if (difficulty) query.difficulty = difficulty;

        // Fetch randomized questions
        const questions = await Question.aggregate([
            { $match: query },
            { $sample: { size: parseInt(limit) } }
        ]);

        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found for the selected criteria." });
        }

        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Submit test and calculate results
// @route   POST /api/tests/submit
// @access  Private
const submitTest = async (req, res) => {
    const { subject, difficulty, answers, timeTaken } = req.body;

    try {
        let correctAnswersCount = 0;
        const totalQuestions = answers.length;
        const processedAnswers = [];

        for (const ans of answers) {
            const question = await Question.findById(ans.questionId);
            if (question) {
                const isCorrect = question.correctAnswer === ans.selectedOption;
                if (isCorrect) correctAnswersCount++;
                processedAnswers.push({
                    question: question._id,
                    selectedOption: ans.selectedOption,
                    isCorrect
                });
            }
        }

        const wrongAnswersCount = totalQuestions - correctAnswersCount;
        const score = correctAnswersCount * 4; // Assuming 4 marks per question
        const accuracy = (correctAnswersCount / totalQuestions) * 100;

        const attempt = await TestAttempt.create({
            user: req.user._id,
            subject,
            difficulty,
            score,
            totalQuestions,
            correctAnswersCount,
            wrongAnswersCount,
            accuracy,
            timeTaken,
            answers: processedAnswers
        });

        res.status(201).json(attempt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user dashboard stats for tests
// @route   GET /api/tests/stats
// @access  Private
const getTestStats = async (req, res) => {
    try {
        const attempts = await TestAttempt.find({ user: req.user._id }).sort({ createdAt: -1 });
        
        const totalAttempts = attempts.length;
        const highestScore = totalAttempts > 0 ? Math.max(...attempts.map(a => a.score)) : 0;
        const averageAccuracy = totalAttempts > 0 
            ? attempts.reduce((acc, curr) => acc + curr.accuracy, 0) / totalAttempts 
            : 0;
        
        const recentHistory = attempts.slice(0, 5);

        // Subject-wise performance
        const subjectStats = await TestAttempt.aggregate([
            { $match: { user: req.user._id } },
            { 
                $group: { 
                    _id: "$subject", 
                    avgScore: { $avg: "$score" },
                    totalAttempts: { $sum: 1 }
                } 
            }
        ]);

        res.json({
            totalAttempts,
            highestScore,
            averageAccuracy,
            recentHistory,
            subjectStats
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get individual test result by ID
// @route   GET /api/tests/result/:id
// @access  Private
const getTestResultById = async (req, res) => {
    try {
        const attempt = await TestAttempt.findOne({ 
            _id: req.params.id, 
            user: req.user._id 
        }).populate('answers.question');

        if (!attempt) {
            return res.status(404).json({ message: 'Test result not found' });
        }

        res.json(attempt);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { startTest, submitTest, getTestStats, getTestResultById };
