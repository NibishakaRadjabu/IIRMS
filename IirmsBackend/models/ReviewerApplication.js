const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const ReviewerApplication = sequelize.define('ReviewerApplication', {
  application_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  salutation: { type: DataTypes.STRING(20), allowNull: false },
  full_name: { type: DataTypes.STRING(255), allowNull: false },
  qualification: { type: DataTypes.STRING(255), allowNull: false },
  designation: { type: DataTypes.STRING(255), allowNull: false },
  department: { type: DataTypes.STRING(255), allowNull: false },
  organization: { type: DataTypes.STRING(255), allowNull: false },
  discipline_field: { type: DataTypes.STRING(255), allowNull: false },
  research_areas: { type: DataTypes.TEXT, allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, validate: { isEmail: true } },
  password_hash: { type: DataTypes.STRING(255), allowNull: true },
  mobile_number: { type: DataTypes.STRING(50), allowNull: false },
  country: { type: DataTypes.STRING(100), allowNull: false },
  state_province: { type: DataTypes.STRING(100), allowNull: false },
  city_district: { type: DataTypes.STRING(100), allowNull: false },
  postal_code: { type: DataTypes.STRING(20), allowNull: false },
  address: { type: DataTypes.TEXT, allowNull: false },
  resume_path: { type: DataTypes.STRING(255), allowNull: false },
  qualification_proof_path: { type: DataTypes.STRING(255), allowNull: false },
  identity_proof_path: { type: DataTypes.STRING(255), allowNull: false },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'minor_revisions', 'major_revisions', 'rejected'),
    defaultValue: 'pending',
  },
  reviewed_by: { type: DataTypes.INTEGER, allowNull: true },
  reviewed_at: { type: DataTypes.DATE, allowNull: true },
  comments: { type: DataTypes.TEXT, allowNull: true },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'Reviewer_Applications',
});

ReviewerApplication.belongsTo(User, { foreignKey: 'reviewed_by', as: 'reviewed_admin' });
User.hasMany(ReviewerApplication, { foreignKey: 'reviewed_by', as: 'reviewed_applications' });

module.exports = ReviewerApplication;
