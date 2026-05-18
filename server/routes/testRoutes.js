const express = require('express');
const router = express.Router();
const { startTest, submitTest, getTestStats, getTestResultById } = require('../controllers/testController');
const { protect } = require('../middleware/authMiddleware');

router.post('/start', protect, startTest);
router.post('/submit', protect, submitTest);
router.get('/stats', protect, getTestStats);
router.get('/result/:id', protect, getTestResultById);

module.exports = router;
