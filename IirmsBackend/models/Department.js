const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Department = sequelize.define('Department', {
  department_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  faculties: { type: DataTypes.STRING(255), allowNull: false },
  depertment: { type: DataTypes.STRING(255) },
  speciality: { type: DataTypes.STRING(255), allowNull: false, defaultValue: '0' },
}, { timestamps: false, tableName: 'Departments' });

module.exports = Department;
