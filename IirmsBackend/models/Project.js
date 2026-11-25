const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Department = require('./Department');

const Project = sequelize.define('Project', {
  project_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  project_name: { type: DataTypes.STRING(255), allowNull: false },
}, { timestamps: false, tableName: 'Projects' });

Project.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
Department.hasMany(Project, { foreignKey: 'department_id', as: 'projects' });

module.exports = Project;
