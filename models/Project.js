const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Owners = require('./owners');
const Company = require('./company');

const Project = sequelize.define('Project', {
  project_id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  Project_name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deadline: {
    type: DataTypes.DATE,
  },
  owner_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Owners,
      key: 'owner_id',
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
}
,
{
       
  timestamps: false,
});

Project.belongsTo(Owners, { foreignKey: 'owner_id', onDelete: 'CASCADE' });
Project.belongsTo(Company, { foreignKey: 'company_id', onDelete: 'CASCADE' });

module.exports = Project;
