const express = require('express');
const router = express.Router();
const controller = require('../controllers/paypalController');
const { protect } = require('../middleware/authMiddleware');

router.get('/config', controller.getConfig);
router.post('/orders', protect, controller.createOrder);
router.post('/orders/:orderId/capture', protect, controller.captureOrder);

module.exports = router;
