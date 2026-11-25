const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const EventNews = sequelize.define('EventNews', {
  event_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  content: { type: DataTypes.TEXT },
  image_url: { type: DataTypes.STRING(255) },
  event_date: { type: DataTypes.DATE },
  type: { type: DataTypes.ENUM('event', 'news'), defaultValue: 'news' },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
  created_by: { type: DataTypes.INTEGER },
}, { timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', tableName: 'EventNews' });

module.exports = EventNews;
