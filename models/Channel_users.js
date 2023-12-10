const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Channel = require('./channel');
const Company = require('./company');
const Employees = require('./employees');

const Channel_Users = sequelize.define('Channel_Users', {
  company_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Company,
      key: 'company_id',
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
  channel_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Channel,
      key: 'channel_id',
    },
  },
});

Channel_Users.belongsTo(Company, { foreignKey: 'company_id', onDelete: 'CASCADE' });
Channel_Users.belongsTo(Employees, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Channel_Users.belongsTo(Channel, { foreignKey: 'channel_id', onDelete: 'CASCADE' });

module.exports = Channel_Users;