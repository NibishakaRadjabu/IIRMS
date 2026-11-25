const express = require('express');
const router = express.Router();
const { getSlides, createSlide, updateSlide, deleteSlide, upload } = require('../controllers/heroController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getSlides);
router.post('/', protect, upload, createSlide);
router.put('/:id', protect, upload, updateSlide);
router.delete('/:id', protect, deleteSlide);

module.exports = router;
