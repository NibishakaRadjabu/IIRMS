const express = require('express');
const router = express.Router();
const {
  getEventsAndNews,
  getAllEventsAndNews,
  createEventNews,
  updateEventNews,
  deleteEventNews,
  getEventNewsById,
  upload,
} = require('../controllers/eventNewsController');
const { protect } = require('../middleware/authMiddleware');

// Admin routes (must come first before parameterized routes)
router.post('/', protect, upload, createEventNews);
router.put('/:id', protect, upload, updateEventNews);
router.delete('/:id', protect, deleteEventNews);
router.get('/admin/all', protect, getAllEventsAndNews);

// Public routes (after admin routes)
router.get('/', getEventsAndNews);
router.get('/:id', getEventNewsById);

module.exports = router;
