const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Department = require('./Department');
const Project = require('./Project');
const Publication = require('./Publication');

const Submission = sequelize.define('Submission', {
  submission_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  file_path: { type: DataTypes.STRING(255) },
  abstract: { type: DataTypes.TEXT },
  research_summary: { type: DataTypes.TEXT },
  status: {
    type: DataTypes.ENUM('submitted', 'under_review', 'approved', 'minor_revisions', 'major_revisions', 'rejected', 'certificate_issued'),
    defaultValue: 'submitted',
  },
  publication_id: { type: DataTypes.INTEGER, allowNull: true },
}, { timestamps: true, createdAt: 'submitted_at', updatedAt: false, tableName: 'Research_Submissions' });

Submission.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Submission, { foreignKey: 'user_id', as: 'submissions' });

Submission.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
Department.hasMany(Submission, { foreignKey: 'department_id', as: 'submissions' });

Submission.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });
Project.hasMany(Submission, { foreignKey: 'project_id', as: 'submissions' });

Submission.belongsTo(Publication, { foreignKey: 'publication_id', as: 'publication' });
Publication.hasOne(Submission, { foreignKey: 'publication_id', as: 'submission' });

module.exports = Submission;
