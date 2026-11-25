const express = require('express');
const router = express.Router();
const {
  protect,
  requireScientificStaff,
  requireLeadership,
  requireScientificDepartmentManager,
} = require('../middleware/authMiddleware');
const f = require('../controllers/facultyController');

router.get('/department', protect, requireScientificStaff, f.getDepartment);
router.get('/students', protect, requireScientificStaff, f.getStudents);
router.get('/staff', protect, requireLeadership, f.getScientificStaff);
router.get('/submissions', protect, requireScientificStaff, f.getSubmissions);
router.post('/notifications', protect, requireScientificStaff, f.sendNotification);
router.put('/submissions/:id', protect, requireLeadership, f.updateSubmission);

module.exports = router;
