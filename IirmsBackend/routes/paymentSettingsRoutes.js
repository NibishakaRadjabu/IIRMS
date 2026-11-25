const express = require('express');
const router = express.Router();
const controller = require('../controllers/paymentSettingsController');
const { protect, requireAdmin } = require('../middleware/authMiddleware');

router.get('/public', controller.getPublicSettings);
router.get('/', protect, requireAdmin, controller.getSettings);
router.put('/', protect, requireAdmin, controller.updateSettings);

module.exports = router;
