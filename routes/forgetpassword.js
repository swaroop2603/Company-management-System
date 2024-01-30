const express=require('express')
const {Employees_mailExists}=require('../forigen_keys')
const Tokens_used=require('../models/uuid_table')
const {v4:uuidv4}=require('uuid')

const router=express.Router()
const nodemailer = require('nodemailer');
router.post('/resetlink',async(req,res)=>{
    const referringURL = req.headers.referer;
    const {mailid}=req.body
    const employeeexits=await Employees_mailExists(mailid)
    if(employeeexits)
    {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
          });
          const token=uuidv4()
          
          // Email content
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: mailid,
            subject: 'Subject of the Email',
            text: `${referringURL}reset?mail_id=${mailid}&token=${token}`,
            
          };
          
          // Sen the email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error('Error sending email:', error);
              return res.status(404).json({"error":"error while sending"})
            } else {
                return res.status(200).json({"message":"reset link sended successfully"})
    
            }
          });
          const response=await Tokens_used.create({
            "UUIDs":token,
            "accepted":false
          })
    }else{
        return res.status(404).json({"error":"enter valid mail id"})
    }

})
module.exports = router;