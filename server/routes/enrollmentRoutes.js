const express = require('express');
const router = express.Router();
const { enrollCourse, getMyEnrollments, updateProgress } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, enrollCourse);

router.route('/my')
    .get(protect, getMyEnrollments);

router.route('/:id/progress')
    .put(protect, updateProgress);

module.exports = router;
