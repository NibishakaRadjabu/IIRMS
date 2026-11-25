const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const HeroSlide = sequelize.define('HeroSlide', {
  slide_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT },
  image_url: { type: DataTypes.STRING(255) },
  link: { type: DataTypes.STRING(255) },
  active: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { timestamps: true, createdAt: 'created_at', updatedAt: false, tableName: 'HeroSlides' });

module.exports = HeroSlide;
