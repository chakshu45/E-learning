const express = require('express');
const router = express.Router();
const { addLesson, getLessonsByCourse } = require('../controllers/lessonController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize('instructor', 'admin'), addLesson);

router.route('/course/:courseId')
    .get(protect, getLessonsByCourse);

module.exports = router;
