const {DataTypes}=require('sequelize')
const sequelize=require('../sequelize')
const Company=require('./company')
const Employees=require('./employyes')
const Owners=sequelize.define('Owners',{
    owner_id:{
        type:DataTypes.UUID,
        primaryKey:true
    },
    company_id:{
        type:DataTypes.UUID,
        references:{
            model:Company,
            key:"company_id"
        }
    },
    user_id:{
        type:DataTypes.UUID,
        references:{
            model:Employees,
            key:"user_id"
        }
    },
    

    

})
Owners.belongsTo(Company,{foreignKey:'company_id',onDelete:'CASCADE'})
Owners.belongsTo(Employees,{foreignKey:'user_id',onDelete:'CASCADE'})
module.exports=Owners