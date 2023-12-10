const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('company_management_system', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
