// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db');
// const User = require('./User');

// const StudentProfile = sequelize.define('StudentProfile', {
//   profile_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   university: { type: DataTypes.STRING(255) },
//   trade: { type: DataTypes.STRING(255) },
//   lesson: { type: DataTypes.STRING(255) },
//   combination: { type: DataTypes.STRING(255) },
//   profile_image: { type: DataTypes.STRING(255) },
// }, { timestamps: false, tableName: 'StudentProfiles' });

// StudentProfile.belongsTo(User, { foreignKey: 'user_id', as: 'user', onDelete: 'CASCADE' });
// User.hasOne(StudentProfile, { foreignKey: 'user_id', as: 'profile' });

// module.exports = StudentProfile;
// models/Profile.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const StudentProfile = sequelize.define('StudentProfile', {
  profile_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  university: { type: DataTypes.STRING(255) },
  trade: { type: DataTypes.STRING(255) },
  lesson: { type: DataTypes.STRING(255) },
  combination: { type: DataTypes.STRING(255) },
  profile_image: { type: DataTypes.STRING(255) },
  resume_path: { type: DataTypes.STRING(255), allowNull: true },
  qualification_proof_path: { type: DataTypes.STRING(255), allowNull: true },
  identity_proof_path: { type: DataTypes.STRING(255), allowNull: true },
}, { timestamps: false, tableName: 'StudentProfiles' });

module.exports = StudentProfile;
