const {DataTypes}=require('sequelize')
const sequelize =require('../sequelize')
const Company=require('./company')
const Employees = require('./employyes')
const Chat=sequelize.define('Chat',{
    char_id:{
        type:DataTypes.UUID,
        primaryKey:true,

    },
createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at', 
  },
  user_id1:{
    type:DataTypes.UUID,
    allowNull:false,
    references:{
        model:this.Employees,
        key:'user_id'
    }
},
user_id2:{
    type:DataTypes.UUID,
    allowNull:false,
    references:{
        model:Employees,
        key:'user_id'
    }
},
    company_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:Company,
            key:'company_id'
        }
    }
})
Chat.belongsTo(Company,{foreignKey:'company_id',onDelete:'CASCADE'})
Chat.belongsTo(Employees,{foreignKey:'user_id1',onDelete:'CASCADE'})
Chat.belongsTo(Employees,{foreignKey:'user_id2',onDelete:'CASCADE'})
module.exports=Chat