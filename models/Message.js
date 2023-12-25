const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Chat = require('./chat');
const Employees = require('./employyes');

const Message = sequelize.define('Message', {
  message_id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  chat_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Chat,
      key: 'chat_id',
    },
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Employees,
      key: 'user_id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
},
{
       
  timestamps: false,
});

Message.belongsTo(Chat, { foreignKey: 'chat_id', onDelete: 'CASCADE' });
Message.belongsTo(Employees, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = Message;
