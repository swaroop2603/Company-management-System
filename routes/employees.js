const express = require('express');
const router = express.Router();
const {v4:uuidv4}= require('uuid')
const Employees =require('../models/employyes')
const {Company_idExists, Employees_idExists} =require('../forigen_keys')
const bcrpt=require('bcrypt')
const Tokens_invite=require('../models/uuid_table')
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
router.post('/employees/invite',async(req,res)=>{
    try{
        const user_id=uuidv4()
        const {email,user_name,password}=req.body
        const {company_id,token}=req.query
        const token_availabe=await Tokens_invite.findByPk(token)
        if(!token_availabe){
            return res.status(404).json({"error":"invalid token"})

        }
        if(token_availabe){
            if(token_availabe.accepted==true)
            return res.status(404).json({"error":"token experied"})
        }
        

        
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
            const add_token=await Tokens_invite.update(
                {accepted:true},
                {where:{
                    UUIDs:token,
                    accepted:false
                }}


            )
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
router.get('/employees',async(req,res)=>{
    console.log(1)
try{
    //console.log(1)
    const users=await Employees.findOne({where:{user_id:req.query.user_id}})
    // console.log(users)
    // console.log(req.query.user_id)
    if(users){
        return res.status(200).json(users)
    }
    return res.status(404).json("employees not found")
}catch(error){
    console.log(1)
    return res.status(500).json(error)
}
})
router.get('/company/employees',async(req,res)=>{
    try{
        const {company_id}=req.query
        const object=await Employees.findAll({
            where:{
                company_id:company_id
            }
        })
        return res.status(200).json(object)
    }catch(error){
        return res.status(404).json("error")
    }
})
router.delete('/employees',async(req,res)=>{
    try{
        const {user_id}=req.query
        const object=await Employees.destroy({
            where:{
                user_id:user_id
            }
        })
        return res.status(200).json({"message":"deleted successfull"})
    }catch(error){
        return res.status(404).json(error)
    }
})
module.exports = router;