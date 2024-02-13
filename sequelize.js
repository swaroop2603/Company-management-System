const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sql6681003', 'sql6681003', 'CEf8UmpQi6', {
  host: 'sql6.freesqldatabase.com',
  dialect: 'mysql',
});
module.exports = sequelize;
// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('company_management_system', 'root', '123', {
//   host: 'localhost',
//   dialect: 'mysql',
// });

// module.exports = sequelize;