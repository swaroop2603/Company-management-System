const express = require('express');
const router = express.Router();
const {v4:uuidv4}= require('uuid')
const Owners=require('../models/owners')
const {Company_idExists, Employees_idExists} =require('../forigen_keys')

router.post('/owners',async(req,res)=>{
    try{
    const {company_id,user_id}=req.body
    owner_id=uuidv4()
    const companyexists=await Company_idExists(company_id)
    const employeeexists=await Employees_idExists(user_id)
    if(companyexists && employeeexists){
        const owners=await Owners.create({
            owner_id:owner_id,
            company_id:company_id,
            user_id:user_id ,
        });
        
        return res.status(200).json(owners)
    }
    else if(!companyexists){
        res.status(404).json({error:"please entry valid company id"})

    }
    else if(!employeeexists){
        res.status(404).json({error:"please entry valid employye id"})
    }
}catch(error){
console.log(error)
}
})
module.exports = router;