const {DataTypes}=require('sequelize')
const sequelize =require('../sequelize')
const Company=require('./company')
const Employees=sequelize.define('Employyes',{
    user_id:{
        type:DataTypes.UUID,
        primaryKey:true,

    },
    email:{
        type:DataTypes.STRING,

    },
    username:{
        type:DataTypes.STRING
    }
,
password:{
    type:DataTypes.STRING
},
createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at', 
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
Employees.belongsTo(Company,{foreignKey:'company_id',onDelete:'CASCADE'})
module.exports=Employees