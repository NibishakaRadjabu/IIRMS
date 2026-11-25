const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Notification = sequelize.define('Notification', {
  notification_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  message: { type: DataTypes.TEXT },
}, { timestamps: true, createdAt: 'created_at', updatedAt: false, tableName: 'Notifications' });

Notification.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Notification, { foreignKey: 'user_id', as: 'notifications' });

module.exports = Notification;
