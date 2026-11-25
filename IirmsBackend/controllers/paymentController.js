const Payment = require('../models/Payment');
const { User, StudentProfile, Submission } = require('../models');

exports.createPayment = async (req, res) => {
  try {
    const userId = req.user.user_id;
    if (req.body.transaction_id) {
      const existing = await Payment.findOne({ where: { transaction_id: req.body.transaction_id } });
      if (existing) return res.status(409).json({ message: 'This transaction has already been recorded.' });
    }
    const payment = await Payment.create({ ...req.body, user_id: userId });
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPayments = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const payments = await Payment.findAll({ where: { user_id: userId } });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
