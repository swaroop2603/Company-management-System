const express=require('express')
const router=express.Router()
const Channel=require('../models/channel')
const Channel_chat=require('../models/Channel_chat')
const Channel_Users=require('../models/Channel_users')
const Owners=require('../models/owners')
const {Company_idExists, Employees_idExists,Owner_idExists,channel_idexists} =require('../forigen_keys')
const {v4:uuidv4}= require('uuid')
const { Op } = require('sequelize');
router.post('/channel',async(req,res)=>{
    try{
        const {company_id,owner_id,channel_name}=req.body
        console.log(company_id)
        const companyexists=await Company_idExists(company_id)
        console.log(100)
        const ownerexists=await Owner_idExists(owner_id,company_id)
        console.log(101)
        if(companyexists&&ownerexists){
            const channel_id=uuidv4()
            const object=await Channel.create({
                channel_id:channel_id,
                company_id:company_id,
                channel_name:channel_name,
                owner_id:owner_id
            })
            const owner_object=await Owners.findOne({
                where:{
                    owner_id:owner_id
                }
            })
            console.log(owner_object)
            const users=await Channel_Users.create({
                company_id:company_id,
                channel_id:channel_id,
                user_id:owner_object.user_id
            })

            res.status(201).json(object)
        }else{
            return res.status(404).json("object not found")
         }
    }
    catch(error){
        res.status(401).json({ error: 'Internal Server Error' })
        console.log(error)
    }
})
router.get('/channel',async(req,res)=>{
    console.log(222)
    try{
        const {user_id}=req.query
        console.log("inside channel users",user_id)
        const emlopeeexists=await Employees_idExists(user_id)
        if(emlopeeexists){
            const object=await Channel_Users.findAll({
                where:{
                    user_id:user_id
                }
            })
            console.log(object)
            res.status(200).json(object)

        }
    }catch(error){
        console.log(error)
        res.status(401).json({ error: 'Internal Server Error' })
        
    }
})
router.get('/channelname',async(req,res)=>{
    try{
        const {channel_id}=req.query
        const channelexists=await channel_idexists(channel_id)
        if(channelexists){
            const object=await Channel.findOne({
                where:{
                    channel_id:channel_id
                }
            })
            res.status(200).json(object)

        }
    }catch(error){
        console.log(error)
        res.status(401).json({ error: 'Internal Server Error' })
        
    }
})

module.exports=router