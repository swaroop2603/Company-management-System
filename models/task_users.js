const {DataTypes, DATE}=require('sequelize')
const sequelize=require('../sequelize')
const Project_Members=require('./Project_memebers')
const Project=require('./Project')
const Company=require('./company')
const Tasks = require('./Tasks')
const Task_users=sequelize.define('Task_users',{
    task_id:{
     type:DataTypes.UUID,
     allowNull:false,
     references:{
        model:Tasks,
        key:'task_id'
     }
    },
       user_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Project_Members,
            key:'user_id',
        },
    },project_id: {
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
})
Task_users.belongsTo(Company, { foreignKey: 'company_id', onDelete: 'CASCADE' });
Task_users.belongsTo(Project, { foreignKey: 'project_id', onDelete: 'CASCADE' });
Task_users.belongsTo(Project_Members,{foreignKey:'user_id',onDelete:'CASCADE'})
Task_users.belongsTo(Tasks,{foreignKey:'task_id',onDelete:'CASCADE'})
module.exports=Task_users