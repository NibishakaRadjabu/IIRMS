const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { protect, requireAdmin } = require('../middleware/authMiddleware');
const reviewerController = require('../controllers/reviewerController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/reviewer'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase();
    const name = `${Date.now()}-${Math.round(Math.random() * 100000)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === 'resume') {
      const valid = /\.(doc|docx|pdf)$/i.test(file.originalname || '');
      return valid ? cb(null, true) : cb(new Error('Resume must be .doc, .docx, or .pdf'));
    }
    const valid = /\.(pdf|png|jpg|jpeg)$/i.test(file.originalname || '');
    return valid ? cb(null, true) : cb(new Error('Qualification and identity proof must be .pdf, .jpg, .png'));
  },
});

const handleApplicationUpload = (req, res, next) => {
  upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'qualification_proof', maxCount: 1 },
    { name: 'identity_proof', maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message || 'Invalid reviewer application file.' });
    }
    next();
  });
};

router.post(
  '/apply',
  handleApplicationUpload,
  reviewerController.submitReviewerApplication
);

router.post('/login', reviewerController.reviewerLogin);

router.get('/applications', protect, requireAdmin, reviewerController.getReviewerApplications);
router.get('/applications/:id', protect, requireAdmin, reviewerController.getReviewerApplication);
router.put('/applications/:id/status', protect, requireAdmin, reviewerController.updateReviewerApplicationStatus);
router.get('/submissions', protect, reviewerController.getReviewerSubmissions);
router.post('/submissions/:id/review', protect, reviewerController.submitSubmissionReview);

module.exports = router;
