const express = require('express');
const router = express.Router();
const {v4:uuidv4}= require('uuid')
const Employees =require('../models/employyes')
const {Company_idExists, Employees_idExists} =require('../forigen_keys')
const bcrpt=require('bcrypt')
async function hashpassword(password){
    const saltRounds=10
    return bcrpt.hash(password,saltRounds)
}
function emailverification(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}
router.post('/employees',async(req,res)=>{
    try{
        const user_id=uuidv4()
        const {email,user_name,password,company_id}=req.body
        
        const companyexists=await Company_idExists(company_id)
        
        if(companyexists ){
            const emailverfied=emailverification(email)
            if(emailverfied){
            const hashed_password=await hashpassword(password)
            const employyees=await Employees.create({
                user_id: user_id,
          email: email,
          username: user_name,
          password: hashed_password,
          company_id: company_id,
            })
            return res.status(201).json(employyees)

            }
            else{
                res.status(400).json({error:"please entry valid email id"})
            }
        } 
        else{
            res.status(404).json({error:"please entry valid company id"})
        }
        
    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router;