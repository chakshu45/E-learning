const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Enroll in a course
// @route   POST /api/enroll
// @access  Private
const enrollCourse = async (req, res) => {
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    const enrollmentExists = await Enrollment.findOne({ 
        user: req.user._id, 
        course: courseId 
    });

    if (enrollmentExists) {
        res.status(400);
        throw new Error('Already enrolled');
    }

    const enrollment = await Enrollment.create({
        user: req.user._id,
        course: courseId
    });

    res.status(201).json(enrollment);
};

// @desc    Get user enrollments
// @route   GET /api/enroll/my
// @access  Private
const getMyEnrollments = async (req, res) => {
    const enrollments = await Enrollment.find({ user: req.user._id }).populate('course');
    res.json(enrollments);
};

// @desc    Update progress
// @route   PUT /api/enroll/:id/progress
// @access  Private
const updateProgress = async (req, res) => {
    const { lessonId, progress } = req.body;
    const enrollment = await Enrollment.findById(req.params.id);

    if (enrollment) {
        if (!enrollment.completedLessons.includes(lessonId)) {
            enrollment.completedLessons.push(lessonId);
        }
        enrollment.progress = progress;
        await enrollment.save();
        res.json(enrollment);
    } else {
        res.status(404);
        throw new Error('Enrollment not found');
    }
};

module.exports = { enrollCourse, getMyEnrollments, updateProgress };
