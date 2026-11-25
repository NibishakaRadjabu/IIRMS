const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const PublicationResearcher = sequelize.define('PublicationResearcher', {
  publication_researcher_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
}, { timestamps: false, tableName: 'Publication_Researchers' });

module.exports = PublicationResearcher;
