const {DataTypes}=require('sequelize')
const sequelize =require('../sequelize')
const Tokens_invite=sequelize.define('Tokens_invite',{
    UUIDs:{
        type:DataTypes.UUID,
        primaryKey:true
    },
    accepted:{
        type:DataTypes.BOOLEAN
    }
}
)
module.exports=Tokens_invite

