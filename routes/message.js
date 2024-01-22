const express =require('express')
const {v4:uuidv4}= require('uuid')
const Chat=require('../models/chat')
const Message=require('../models/Message')
const {Chat_idexists,Employees_idExists}=require('../forigen_keys')
const router=express.Router()
router.post('/message',async(req,res)=>{
    console.log("in post message")
    const message_id=uuidv4()
    const {user_id,chat_id,message}=req.body
    const user1_exists=await Employees_idExists(user_id)
    const Chats= await Chat.findByPk(chat_id)
    if(Chats && user1_exists){
        if(user_id===Chats.user_id1 || user_id===Chats.user_id2){
            await Message.create({
                message:message,
                message_id:message_id,
                chat_id:chat_id,
                user_id:user_id
            })
            const response=await Message.findAll({ 
                where: { chat_id: chat_id },
            order:[['created_at','ASC']] })
            data={
                response,
                message_id
            }

            res.status(200).json(data)
        }else {
            res.status(403).json({ error: 'User is not part of the chat' });
        }
    } else {
       res.status(404).json({ error: 'Chat or user not found' });
    
    }
    


})
router.get('/message',async(req,res)=>{
    try{
        const {chat_id}=req.query
        console.log(chat_id)
        const messages=await Message.findAll({
            where:{chat_id:chat_id},
            order:[['created_at','ASC']]})
        if(!messages){
            return res.status(404).json("no chat found")
        }
       res.status(200).json(messages)

    }catch(error){
        return res.status(500).json(error)
    }
})
module.exports=router