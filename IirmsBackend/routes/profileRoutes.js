const express = require('express');
const router = express.Router();
const {
  createOrUpdateProfile,
  getProfile,
  getProfiles,
} = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getProfiles);
router.get('/:userId', protect, getProfile);
router.post('/', protect, createOrUpdateProfile);

module.exports = router;
