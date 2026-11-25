// const express = require('express');
// const path = require('path');
// const multer = require('multer');
// const router = express.Router();
// const {
//   createSubmission,
//   getSubmissions,
//   getSubmission,
//   updateSubmission,
//   deleteSubmission,
// } = require('../controllers/submissionController');
// const { protect } = require('../middleware/authMiddleware');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
//   filename: (req, file, cb) => cb(null, `submission_${Date.now()}${path.extname(file.originalname)}`),
// });

// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowed = /pdf|doc|docx|jpeg|jpg|png/;
//     const isAllowed = allowed.test(path.extname(file.originalname).toLowerCase());
//     if (isAllowed) return cb(null, true);
//     cb(new Error('Only PDF, Word, or image files are allowed.'));
//   },
// });

// router.post('/', protect, upload.single('document'), createSubmission);
// router.post('/create', protect, upload.single('document'), createSubmission);
// router.get('/', protect, getSubmissions);
// router.get('/:id', protect, getSubmission);
// router.put('/:id', protect, updateSubmission);
// router.delete('/:id', protect, deleteSubmission);

// module.exports = router;
const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const {
  createSubmission,
  getSubmissions,
  getSubmission,
  updateSubmission,
  deleteSubmission,
} = require('../controllers/submissionController');
const { protect } = require('../middleware/authMiddleware');

// Models
const Certificate = require('../models/Certificate');
const User = require('../models/User');
const Submission = require('../models/Submission');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => cb(null, `submission_${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    const allowed = new Set(['.pdf', '.doc', '.docx']);
    const isAllowed = allowed.has(path.extname(file.originalname).toLowerCase());
    if (isAllowed) return cb(null, true);
    cb(new Error('Only PDF or Word manuscript files are allowed.'));
  },
});

const handleUploadError = (err, req, res, next) => {
  if (!err) return next();
  return res.status(400).json({ message: err.message || 'The manuscript could not be uploaded.' });
};

// Create submission
router.post('/', protect, upload.single('document'), handleUploadError, createSubmission);
router.post('/create', protect, upload.single('document'), handleUploadError, createSubmission);

// Get all submissions (with user + certificate)
router.get('/', protect, async (req, res) => {
  try {
    const where = {};
    if (req.user.role !== 'admin') {
      if (req.user.role === 'scientific_staff' && req.user.department_id) {
        where.department_id = req.user.department_id;
      } else {
        where.user_id = req.user.user_id;
      }
    }
    const submissions = await Submission.findAll({
      where,
      include: [
        ...(req.user.role === 'admin' ? [{ model: User, as: 'user', attributes: ['user_id', 'name', 'email'] }] : []),
        { model: Certificate, as: 'certificate' }
      ],
      order: [['submitted_at', 'DESC']]
    });
    res.json(submissions);
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single submission (with certificate)
router.get('/:id', protect, async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user', attributes: ['user_id', 'name', 'email'] },
        { model: Certificate, as: 'certificate' }
      ]
    });
    if (!submission) return res.status(404).json({ message: 'Submission not found' });
    const mayRead = req.user.role === 'admin'
      || Number(submission.user_id) === Number(req.user.user_id)
      || (req.user.role === 'scientific_staff'
        && Number(submission.department_id) === Number(req.user.department_id));
    if (!mayRead) return res.status(403).json({ message: 'You do not have access to this submission.' });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update submission
router.put('/:id', protect, updateSubmission);

// Delete submission
router.delete('/:id', protect, deleteSubmission);

module.exports = router;
