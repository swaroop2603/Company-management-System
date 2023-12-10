const {DataTypes} =require('sequelize')
const sequelize=require('../sequelize')
const Company=sequelize.define('Company',{
    company_id:{
        type:DataTypes.UUID,
        primaryKey:true,
        
    },
    company_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at', 
      },
})
module.exports=Company