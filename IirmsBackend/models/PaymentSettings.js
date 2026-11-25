const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PaymentSettings = sequelize.define('PaymentSettings', {
  payment_settings_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  paypal_enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  paypal_email: { type: DataTypes.STRING(255) },
  card_enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  card_checkout_url: { type: DataTypes.STRING(500) },
  bank_enabled: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  bank_name: { type: DataTypes.STRING(255) },
  bank_account_name: { type: DataTypes.STRING(255) },
  bank_account_number: { type: DataTypes.STRING(255) },
  bank_branch_code: { type: DataTypes.STRING(100) },
  bank_reference_note: { type: DataTypes.TEXT },
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', tableName: 'Payment_Settings' });

module.exports = PaymentSettings;
