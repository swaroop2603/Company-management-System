const express=require('express')
const router=express.Router()
const Chat = require('../models/chat')
const Message=require('../models/Message')
const {Company_idExists, Employees_idExists,Employees_idExists_Company} =require('../forigen_keys')
const {v4:uuidv4}= require('uuid')
const { Op } = require('sequelize');
router.post('/chat',async(req,res)=>{
    try{
    const {company_id,user_id1,user_id2}=req.body
    const companyexists=await Company_idExists(company_id)
    const user1_exists=await Employees_idExists_Company(user_id1,company_id)
    const user2_exists=await Employees_idExists_Company(user_id2,company_id)
    if(companyexists && user1_exists && user2_exists){
        console.log(1)
        const chatExists = await Chat.findOne({
            where: {
              [Op.and]: [
                { user_id1: user_id1},
                {user_id2: user_id2},
                
               
              ]
            }
          });
        if(chatExists){
            console.log(2)
            const chat_id=chatExists.chat_id
            console.log(chat_id)
            const messages=await Message.findAll({ where: { chat_id: chat_id } })
            res.status(200).json(messages)
        }else{
            console.log(3)
            const chat_id=uuidv4()
            const object=await Chat.create({
                chat_id:chat_id,
                company_id:company_id,
                user_id1:user_id1,
                user_id2:user_id2
            })
            console.log(4)
            res.status(201).json(object)
        }
    }else{
        res.status(404).json("object not found")
    }
}catch(error){
    res.status(401).json({ error: 'Internal Server Error' })
    console.log(error)
}
})
router.get('/chat',async(req,res)=>{
    console.log(1)
    try{
        // console.log(user_id)
    const {user_id}=req.query
    console.log(user_id)
    const userexists=await Employees_idExists(user_id)
    if(userexists){
        const company_obj=await Chat.findOne({where: {
         [Op.or]:[
            {user_id1:user_id},
            {user_id2:user_id}
         ]
          }},)
        const company_id=company_obj.company_id
        const chats = await Chat.findAll({
            where:{
                [Op.or]:[
                    {user_id1:user_id},
                    {user_id2:user_id}
                ]
            }},);
            console.log(chats)
            
        res.status(200).json(chats)

    }
    else{
        res.status(404).json("not found")
    }
}
catch(error){
    res.status(400).json("internal server error")
    console.log(error)
}
})
module.exports=router