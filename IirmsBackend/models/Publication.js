// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db');
// const Department = require('./Department');

// const Publication = sequelize.define('Publication', {
//   publication_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   title: { type: DataTypes.STRING(255), allowNull: false },
//   doi: { type: DataTypes.STRING(100) },
//   research_summary: { type: DataTypes.TEXT },
// }, { timestamps: true, createdAt: 'created_at', updatedAt: false, tableName: 'Publications' });

// Publication.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
// Department.hasMany(Publication, { foreignKey: 'department_id', as: 'publications' });

// module.exports = Publication;
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Department = require('./Department');

const Publication = sequelize.define('Publication', {
  publication_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  doi: { type: DataTypes.STRING(100) },
  research_summary: { type: DataTypes.TEXT },
  document: { type: DataTypes.STRING(255), allowNull: true },
  journal_title: { type: DataTypes.STRING(255), allowNull: true },
  volume: { type: DataTypes.STRING(50), allowNull: true },
  issue: { type: DataTypes.STRING(50), allowNull: true },
  publication_year: { type: DataTypes.INTEGER, allowNull: true },
  first_page: { type: DataTypes.STRING(50), allowNull: true },
  last_page: { type: DataTypes.STRING(50), allowNull: true },
  issn: { type: DataTypes.STRING(32), allowNull: true },
  publication_date: { type: DataTypes.DATEONLY, allowNull: true },
}, { 
  timestamps: true, 
  createdAt: 'created_at', 
  updatedAt: false, 
  tableName: 'Publications' 
});

Publication.belongsTo(Department, { foreignKey: 'department_id', as: 'department' });
Department.hasMany(Publication, { foreignKey: 'department_id', as: 'publications' });

module.exports = Publication;
