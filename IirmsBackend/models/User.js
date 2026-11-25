// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db');

// const User = sequelize.define('User', {
//   user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING(255), allowNull: false },
//   email: { type: DataTypes.STRING(255), allowNull: false },
//   password_hash: { type: DataTypes.STRING(255), allowNull: false },
//   role: { type: DataTypes.ENUM('student', 'scientific_staff', 'researcher', 'admin'), defaultValue: 'student' },
//   department_id: { type: DataTypes.INTEGER, allowNull: true },
//   can_manage_department: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
//   verification_code: { type: DataTypes.STRING(50), allowNull: true, unique: true },
// verified: { type: DataTypes.BOOLEAN, defaultValue: false },

// }, { timestamps: true, createdAt: 'created_at', updatedAt: false });

// module.exports = User;
// const { DataTypes } = require('sequelize');
// const { sequelize } = require('../config/db');

// const User = sequelize.define('User', {
//   user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING(255), allowNull: false },
//   email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
//   password_hash: { type: DataTypes.STRING(255), allowNull: false },
//   role: { 
//     type: DataTypes.ENUM('student', 'scientific_staff', 'researcher', 'admin'), 
//     defaultValue: 'student' 
//   },
//   department_id: { type: DataTypes.INTEGER, allowNull: true },
//   can_manage_department: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },

//   // Verification fields
//   verification_code: { type: DataTypes.STRING(50), allowNull: true, unique: true },
//   verified: { type: DataTypes.BOOLEAN, defaultValue: false },
// }, { 
//   timestamps: true, 
//   createdAt: 'created_at', 
//   updatedAt: false 
// });

// module.exports = User;
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
  user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  password_hash: { type: DataTypes.STRING(255), allowNull: false },
  role: { 
    type: DataTypes.ENUM('student', 'scientific_staff', 'researcher', 'admin'), 
    defaultValue: 'student' 
  },
  department_id: { type: DataTypes.INTEGER, allowNull: true },
  can_manage_department: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },

  // Verification fields
  verification_code: { type: DataTypes.STRING(50), allowNull: true, unique: true },
  verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  approval_status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    allowNull: false,
    defaultValue: 'pending',
  },
  approved_by: { type: DataTypes.INTEGER, allowNull: true },
  approved_at: { type: DataTypes.DATE, allowNull: true },
  is_leader: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  leadership_role: { type: DataTypes.STRING(150), allowNull: true },
  password_reset_token_hash: { type: DataTypes.STRING(64), allowNull: true },
  password_reset_expires_at: { type: DataTypes.DATE, allowNull: true },
}, { 
  timestamps: true, 
  createdAt: 'created_at', 
  updatedAt: false,
  tableName: 'Users'
});

module.exports = User;
