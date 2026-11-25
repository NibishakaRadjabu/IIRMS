const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Submission = require('./Submission');
const User = require('./User');

const PeerReview = sequelize.define('PeerReview', {
  review_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  submission_id: { type: DataTypes.INTEGER, allowNull: false },
  reviewer_id: { type: DataTypes.INTEGER, allowNull: true },
  reviewer_application_id: { type: DataTypes.INTEGER, allowNull: true },
  decision: {
    type: DataTypes.ENUM('accepted', 'minor_revisions', 'major_revisions', 'rejected'),
    allowNull: false,
  },
  comments: { type: DataTypes.TEXT, allowNull: true },
  reviewed_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, { timestamps: false, tableName: 'peer_reviews' });

PeerReview.belongsTo(Submission, { foreignKey: 'submission_id', as: 'submission' });
PeerReview.belongsTo(User, { foreignKey: 'reviewer_id', as: 'reviewer' });

module.exports = PeerReview;
