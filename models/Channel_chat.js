const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Channel_Users = require('./Channel_users');
const Channel = require('./channel');

const Channel_Chat = sequelize.define('Channel_Chat', {
  message_id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  user_ID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Channel_Users,
      key: 'user_id',
    },
  },
  channel_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Channel,
      key: 'channel_id',
    },
  },
},
{
       
  timestamps: false,
});

Channel_Chat.belongsTo(Channel_Users, { foreignKey: 'user_ID', onDelete: 'CASCADE' });
Channel_Chat.belongsTo(Channel, { foreignKey: 'channel_id', onDelete: 'CASCADE' });

module.exports = Channel_Chat;
