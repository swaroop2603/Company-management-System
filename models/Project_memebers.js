const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Project = require('./Project');
const Employees = require('./employees');

const Project_Members = sequelize.define('Project_Members', {
  project_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Project,
      key: 'project_id',
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
}
,
{
       
  timestamps: false,
});

Project_Members.belongsTo(Project, { foreignKey: 'project_id', onDelete: 'CASCADE' });
Project_Members.belongsTo(Employees, { foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = Project_Members;
