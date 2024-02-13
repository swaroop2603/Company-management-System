const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Project = require('./Project');
const Project_Members = require('./Project_memebers');
const Company = require('./company');
const Tasks = sequelize.define('Tasks', {
  task_id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING(255),
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deadline: {
    type: DataTypes.DATE,
  },
  project_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Project,
      key: 'project_id',
    },
  },
  company_id: {
    type: DataTypes.UUID,
    allowNull: false,
   
    references: {
      model: Company,
      key: 'company_id',
    },
  },
},
{
       
  timestamps: false,
});
Tasks.belongsTo(Company, { foreignKey: 'company_id', onDelete: 'CASCADE' });
Tasks.belongsTo(Project, { foreignKey: 'project_id', onDelete: 'CASCADE' });


module.exports = Tasks;
