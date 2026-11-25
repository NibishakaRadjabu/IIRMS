const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const Message = sequelize.define('Message', {
  message_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  content: { type: DataTypes.TEXT, allowNull: true },
  file_url: { type: DataTypes.TEXT, allowNull: true },
  file_name: { type: DataTypes.STRING(255), allowNull: true },
  file_type: { type: DataTypes.STRING(100), allowNull: true },
}, { timestamps: true, createdAt: 'timestamp', updatedAt: false, tableName: 'Messages' });

Message.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
Message.belongsTo(User, { foreignKey: 'receiver_id', as: 'receiver' });

module.exports = Message;
