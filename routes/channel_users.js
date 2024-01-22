const express=require('express')
const router=express.Router()
const Channel_users=require('../models/Channel_users')
const {channel_idexists,Company_idExists,Employees_idExists,Employees_idExists_Company}=require('../forigen_keys')
const {v4:uuidv4}=require('uuid')
const {Op}=require('sequelize')
const Channel = require('../models/channel')
const Employees=require('../models/employyes')


router.post('/channel/users',async(req,res)=>{
    try{
        const {company_id,user_id,channel_id}=req.body
        const channelexists=await channel_idexists(channel_id)
        const companyexists=await Company_idExists(company_id)
        const userexists=await Employees_idExists_Company(user_id,company_id)
        if(channelexists&&userexists&&companyexists){
            const object=await Channel_users.create({
                company_id:company_id,
                channel_id:channel_id,
                user_id:user_id
            })
            res.status(201).json(object)
        }else{
           return res.status(404).json("object not found")
        }

    }catch(error){
        res.status(401).json({ error: 'Internal Server Error' })
        console.log(error)}
})
router.get('/channel/users',async(req,res)=>{
    try{
        const {channel_id,company_id}=req.query
        const employees=await Employees.findAll({
            where:{
                company_id:company_id
            }
        }) 
        const object=await Channel_users.findAll({
            where:{
                channel_id:channel_id
            }
        })
        const channelids=object.map(member=>member.user_id)
        const usersInChannel = employees.filter(employee => channelids.includes(employee.user_id));
        
        res.status(200).json(usersInChannel)
    }catch(error){
        console.log(error)
        res.status(401).json({ error: 'Internal Server Error' })
        
    }

    
})
router.get('/company/employees/channel',async(req,res)=>{
    try{
        const {company_id,channel_id}=req.query
        const allEmployees=await Employees.findAll({
            where:{
                company_id:company_id
            }
        })
        const channel_members=await Channel_users.findAll({
            where:{
                channel_id:channel_id
            }
        })
        const channelMemberIds = channel_members.map(member => member.user_id);
        const usersNotInChannel = allEmployees.filter(employee => !channelMemberIds.includes(employee.user_id));
        return res.status(200).json(usersNotInChannel)
    }catch(error){
        return res.status(404).json("error")
    }
})
router.delete('/channel/users',async(req,res)=>{
    try{
const {user_id,channel_id}=req.query
const response=await Channel_users.destroy({
    where:{
        channel_id:channel_id,
        user_id:user_id
    }
})
res.status(201).json({"message":"user removed successfully"})
    }catch(error){
res.status(404).json(error)
    }
})
module.exports=router