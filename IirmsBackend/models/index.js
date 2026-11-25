const { sequelize } = require('../config/db');
const User = require('./User');
const Department = require('./Department');
const Project = require('./Project');
const Publication = require('./Publication');
const Submission = require('./Submission');
const Certificate = require('./Certificate');
const StudentProfile = require('./Profile');

// Associations

// User ↔ StudentProfile
User.hasOne(StudentProfile, { foreignKey: 'user_id', as: 'profile' });
StudentProfile.belongsTo(User, { foreignKey: 'user_id', as: 'profile_user', onDelete: 'CASCADE' });

// User ↔ Submission
User.hasMany(Submission, { foreignKey: 'user_id', as: 'user_submissions' });
Submission.belongsTo(User, { foreignKey: 'user_id', as: 'submission_user' });

// Department ↔ Submission
Department.hasMany(Submission, { foreignKey: 'department_id', as: 'department_submissions' });
Submission.belongsTo(Department, { foreignKey: 'department_id', as: 'submission_department' });

// Project ↔ Submission
Project.hasMany(Submission, { foreignKey: 'project_id', as: 'project_submissions' });
Submission.belongsTo(Project, { foreignKey: 'project_id', as: 'submission_project' });

// Publication ↔ Submission
Publication.hasOne(Submission, { foreignKey: 'publication_id', as: 'publication_submission' });
Submission.belongsTo(Publication, { foreignKey: 'publication_id', as: 'submission_publication' });

// Submission ↔ Certificate
Submission.hasOne(Certificate, { foreignKey: 'submission_id', as: 'certificate' });
Certificate.belongsTo(Submission, { foreignKey: 'submission_id', as: 'submission' });

module.exports = {
  sequelize,
  User,
  Department,
  Project,
  Publication,
  Submission,
  Certificate,
  StudentProfile,
};
