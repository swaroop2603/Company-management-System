const express = require('express');
const router = express.Router();
const {v4:uuidv4}= require('uuid')
const Company =require('../models/company')
const Employee=require('../models/employyes')
router.post('/company',async (req,res)=>{
    try{
        
       const {company_name,email}=req.body;
       console.log(company_name)
       const emailexists=await Employee.findOne({
        where:{
            email:email
        }
       })
       if(emailexists)
       return res.status(404).json({"error":"email already exists"})
       if (!company_name) {
        return res.status(400).json({ "error": 'Company name is required.' });
    }
       
       const company_id=uuidv4()
       const company=await Company.create({
        company_id: company_id,
        company_name: company_name,
    });
       
       res.status(201).json(company)
    }catch(error){
        console.log('error',error)
        res.status(500).json({ error: 'Internal Server Error' });
    }

})
router.get('/company',async(req,res)=>{
    const {company_id}=req.query
    const response=await Company.findByPk(company_id)
    return res.status(200).json(response)
})

module.exports = router;
