const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

module.exports = sequelize.define('LeadershipApplication', {
  application_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  position: { type: DataTypes.STRING(150), allowNull: false },
  department_id: { type: DataTypes.INTEGER, allowNull: true },
  statement: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'approved', 'rejected'), allowNull: false, defaultValue: 'pending' },
  reviewed_by: { type: DataTypes.INTEGER, allowNull: true },
  reviewed_at: { type: DataTypes.DATE, allowNull: true },
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', tableName: 'Leadership_Applications' });
