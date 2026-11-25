// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db');
// const Submission = require('./Submission');
// const { StudentProfile, User } = require('../models');

// const Certificate = sequelize.define('Certificate', {
//   certificate_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   issue_date: { type: DataTypes.DATEONLY },
//   payment_status: { type: DataTypes.ENUM('paid', 'pending'), defaultValue: 'pending' },
//   certificate_url: { type: DataTypes.STRING(255) },
// }, { timestamps: false, tableName: 'Certificates' });

// Certificate.belongsTo(Submission, { foreignKey: 'submission_id', as: 'submission' });
// Submission.hasOne(Certificate, { foreignKey: 'submission_id', as: 'certificate' });

// module.exports = Certificate;
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Certificate = sequelize.define('Certificate', {
  certificate_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  submission_id: { type: DataTypes.INTEGER, allowNull: false },
  issue_date: { type: DataTypes.DATEONLY },
  payment_status: { type: DataTypes.ENUM('paid', 'pending'), defaultValue: 'pending' },
  certificate_url: { type: DataTypes.STRING(255) },
}, { 
  timestamps: false, 
  tableName: 'Certificates' 
});

module.exports = Certificate;
