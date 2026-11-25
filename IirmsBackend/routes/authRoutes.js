const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { register, login, forgotPassword, resetPassword, me, updateMe, deleteMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(__dirname, '../uploads/staff-documents')),
  filename: (_req, file, cb) => cb(null, `staff-${Date.now()}-${Math.round(Math.random() * 100000)}${path.extname(file.originalname).toLowerCase()}`),
});
fs.mkdirSync(path.join(__dirname, '../uploads/staff-documents'), { recursive: true });
const staffDocuments = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const valid = file.fieldname === 'resume'
      ? /\.(doc|docx|pdf)$/i.test(file.originalname || '')
      : /\.(pdf|png|jpg|jpeg)$/i.test(file.originalname || '');
    cb(valid ? null : new Error(`Invalid ${file.fieldname} file type.`), valid);
  },
});

router.post('/register', staffDocuments.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'qualification_proof', maxCount: 1 },
  { name: 'identity_proof', maxCount: 1 },
]), register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/me', protect, me);
router.put('/me', protect, updateMe);
router.delete('/me', protect, deleteMe);
router.get('/departments', require('../controllers/adminController').getDepartments);

module.exports = router;
