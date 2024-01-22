const express=require('express')
const router=express.Router()
const Channel_chat=require('../models/Channel_chat')
const {Company_idExists, Employees_idExists,channel_idexists} =require('../forigen_keys')
const {v4:uuidv4}= require('uuid')
const { Op } = require('sequelize');
router.post('/channel/chat',async(req,res)=>{
    try{
        const {message,user_id,channel_id}=req.body
        console.log(req.body)
        const channelexists=await channel_idexists(channel_id)
        const employeesExists=await Employees_idExists(user_id)
        if(channelexists&&employeesExists){
            const message_id=uuidv4()
            const object=Channel_chat.create({
                message_id:message_id,
                message:message,
                user_ID:user_id,
                channel_id:channel_id
            })
            console.log(object)
            const response=await Channel_chat.findAll({
                where: { channel_id: channel_id},
                order:[['created_at','ASC']]
            })
            
            data={
                response,
                message_id
            }

            res.status(200).json(data)
            
        }else{
           return res.status(404).json("object not found")
        }
    }catch(error){
        console.log(error)
        res.status(404).json({ error: 'Internal Server Error' })
    }
    
})
router.get('/channel/chat',async(req,res)=>{
    try{
        const {channel_id}=req.query
        const channelexists=await channel_idexists(channel_id)
        const messages=await Channel_chat.findAll({
            where:{channel_id:channel_id},
            order:[['created_at','ASC']]
        })
        if(!messages){
            return res.status(404).json("no chat found")
        }
        return res.status(200).json(messages)
    }catch(error){
        return res.status(500).json(error)
    }
})
module.exports=router