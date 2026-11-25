const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Project = require('./Project');

const FundingGrant = sequelize.define('FundingGrant', {
  funding_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  grant_amount: { type: DataTypes.DECIMAL(10, 2) },
}, { timestamps: false, tableName: 'Funding_Grants' });

FundingGrant.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });
Project.hasMany(FundingGrant, { foreignKey: 'project_id', as: 'grants' });

module.exports = FundingGrant;
