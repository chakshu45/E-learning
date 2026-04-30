const Course = require('../models/Course');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate('instructor', 'name');
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('instructor', 'name bio profileImage');
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Instructor/Admin
const createCourse = async (req, res) => {
    const { title, subtitle, description, price, category, level, thumbnail } = req.body;

    const course = new Course({
        title,
        subtitle,
        description,
        price,
        category,
        level,
        thumbnail,
        instructor: req.user._id,
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
};

module.exports = { getCourses, getCourseById, createCourse };
