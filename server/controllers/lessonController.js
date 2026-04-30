const Lesson = require('../models/Lesson');

// @desc    Add lesson to course
// @route   POST /api/lessons
// @access  Private/Instructor/Admin
const addLesson = async (req, res) => {
    const { course, title, content, videoUrl, order, duration } = req.body;

    const lesson = new Lesson({
        course,
        title,
        content,
        videoUrl,
        order,
        duration
    });

    const createdLesson = await lesson.save();
    res.status(201).json(createdLesson);
};

// @desc    Get lessons for a course
// @route   GET /api/lessons/course/:courseId
// @access  Private
const getLessonsByCourse = async (req, res) => {
    const lessons = await Lesson.find({ course: req.params.courseId }).sort('order');
    res.json(lessons);
};

module.exports = { addLesson, getLessonsByCourse };
