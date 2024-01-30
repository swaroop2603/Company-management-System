const express=require('express')
const {Employees_mailExists_Company}=require('../forigen_keys')
const Tokens_used=require('../models/uuid_table')
const {v4:uuidv4}=require('uuid')

const router=express.Router()
const nodemailer = require('nodemailer');
router.post('/invite',async(req,res)=>{
    const {mailid,company_id}=req.body
    const employeesexists=await Employees_mailExists_Company(mailid,company_id)
    if(employeesexists)
    return res.status(404).json({"error":"mail id already exists"})
else{
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
        text: `https://65b93b094937021932545deb--rainbow-twilight-1ec57b.netlify.app/invite?mail_id=${mailid}&company_id=${company_id}&token=${token}`,
        
      };
      
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(404).json({"error":"error while sending"})
        } else {
            return res.status(200).json({"message":"mail invited sended successfully"})

        }
      });
      const response=await Tokens_used.create({
        "UUIDs":token,
        "accepted":false
      })
}

})
module.exports = router;