const express = require('express');
const router = express.Router();
const { protect, requireAdmin, requireScientificStaff } = require('../middleware/authMiddleware');
const leadership = require('../controllers/leadershipController');

router.post('/applications', protect, requireScientificStaff, leadership.apply);
router.get('/applications/mine', protect, requireScientificStaff, leadership.getMine);
router.get('/applications', protect, requireAdmin, leadership.getAll);
router.patch('/applications/:id', protect, requireAdmin, leadership.review);
module.exports = router;
