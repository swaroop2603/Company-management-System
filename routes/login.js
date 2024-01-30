const express =require('express')
const router=express.Router()
const Employyes=require('../models/employyes')
const bcrpt=require('bcrypt')
const Tokens_invite=require('../models/uuid_table')
router.post('/login',async(req,res)=>{
    try{
const {email,password}=req.body
const user=await Employyes.findOne({where:{email:email}})
if(!user)
return res.status(401).json({ "error": 'Invalid email ' });
const passwordmatch=await bcrpt.compare(password,user.password)
if (!passwordmatch) {
    return res.status(401).json({ "error": 'Invalid email or password' });
  }
console.log(user)
  
  return res.status(200).json(user);
}catch(error){
    console.log(error)
}
}
)
router.put('/forgot_password', async (req, res) => {
  try {
    const { email, password,token } = req.body;
    const token_availabe=await Tokens_invite.findByPk(token)
    if(!token_availabe){
        return res.status(404).json({"error":"invalid token"})

    }
    if(token_availabe){
        if(token_availabe.accepted==true)
        return res.status(404).json({"error":"token experied"})
    }
    
    const user = await Employyes.findOne({ where: { email: email } });
    
    if (!user) {
      return res.status(404).json({ "error": 'User not found' });
    }

    const hashedPassword = await bcrpt.hash(password, 10);
    await Employyes.update({ password: hashedPassword }, { where: { email: email } });
    const add_token=await Tokens_invite.update(
      {accepted:true},
      {where:{
          UUIDs:token,
          accepted:true
      }}


  )
    return res.status(200).json({ "message": 'Password updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ "error": 'Internal server error' });
  }
});
module.exports=router