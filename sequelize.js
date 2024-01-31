const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sql6681003', 'sql6681003', 'CEf8UmpQi6', {
  host: 'sql6.freesqldatabase.com',
  dialect: 'mysql',
});
module.exports = sequelize;
  