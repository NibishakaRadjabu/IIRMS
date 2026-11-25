const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, getContacts, upload } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.get('/contacts', protect, getContacts);
router.get('/', protect, getMessages);
router.post('/', protect, upload, sendMessage);

module.exports = router;
