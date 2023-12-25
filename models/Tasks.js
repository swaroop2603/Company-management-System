const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Project = require('./Project');
const Project_Members = require('./Project_members');

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
  user_ID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Project_Members,
      key: 'user_id',
    },
  },
},
{
       
  timestamps: false,
});

Tasks.belongsTo(Project, { foreignKey: 'project_id', onDelete: 'CASCADE' });
Tasks.belongsTo(Project_Members, { foreignKey: 'user_ID', onDelete: 'CASCADE' });

module.exports = Tasks;
