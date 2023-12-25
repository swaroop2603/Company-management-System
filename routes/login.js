const express =require('express')
const router=express.Router()
const Employyes=require('../models/employyes')
const bcrpt=require('bcrypt')
router.post('/login',async(req,res)=>{
    try{
const {email,password}=req.body
const user=await Employyes.findOne({where:{email:email}})
if(!user)
return res.status(401).json({ error: 'Invalid email or password' });
const passwordmatch=await bcrpt.compare(password,user.password)
if (!passwordmatch) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
console.log(user)
  
  return res.status(200).json(user);
}catch(error){
    console.log(error)
}
}
)
module.exports=router