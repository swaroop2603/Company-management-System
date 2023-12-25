const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Company = require('./company');
const Owners = require('./owners');

const Channel = sequelize.define('Channel', {
  channel_id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  channel_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  company_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Company,
      key: 'company_id',
    },
  },
  owner_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Owners,
      key: 'owner_id',
    },
  },
},
{
       
  timestamps: false,
});

Channel.belongsTo(Company, { foreignKey: 'company_id', onDelete: 'CASCADE' });
Channel.belongsTo(Owners, { foreignKey: 'owner_id', onDelete: 'CASCADE' });

module.exports = Channel;
