const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Submission = require('./Submission');

const Payment = sequelize.define('Payment', {
  payment_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  amount: { type: DataTypes.DECIMAL(10, 2) },
  method: { type: DataTypes.ENUM('paypal', 'credit_card', 'mobile_money', 'bank_transfer') },
  // Some existing databases already have this column indexed. Declaring the
  // constraint here makes Sequelize repeatedly ALTER it during sync({ alter:
  // true }), which fails on MySQL. Controllers still prevent duplicate IDs.
  transaction_id: { type: DataTypes.STRING(255) },
}, { timestamps: true, createdAt: 'paid_at', updatedAt: false, tableName: 'Payments' });

Payment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Payment, { foreignKey: 'user_id', as: 'payments' });

Payment.belongsTo(Submission, { foreignKey: 'submission_id', as: 'submission' });
Submission.hasMany(Payment, { foreignKey: 'submission_id', as: 'payments' });

module.exports = Payment;
