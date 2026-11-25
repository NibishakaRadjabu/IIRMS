const express = require('express');
const router = express.Router();
const {
  createCertificate,
  getCertificates,
  getCertificate,
} = require('../controllers/certificateController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createCertificate);
router.get('/', protect, getCertificates);
router.get('/:id', protect, getCertificate);

module.exports = router;
