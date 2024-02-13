const express=require('express')
const Project_memebers=require('../models/Project_memebers')
const Employees=require('../models/employyes')
const {Project_exits,Company_idExists,Employees_idExists_Company}=require('../forigen_keys')
const { Op } = require('sequelize');
const router=express.Router()
router.post('/project_memebers',async(req,res)=>{
    try{

        const {project_id,company_id,user_id}=req.body
        const projectexists=await Project_exits(project_id,company_id)
        const companyexists=await Company_idExists(company_id)
        const employeesvalid=await Employees_idExists_Company(user_id,company_id)
        if(!employeesvalid)
        return res.status(404).json({"error":"invalid employee details"})
        if(!companyexists){
            return res.status(404).json({"error":"invalid company id"})
        }
        if(!projectexists)
        return res.status(404).json({"error":"invalid project id"})
const response=await Project_memebers.create({
    "project_id":project_id,
    "user_id":user_id,
    "company_id":company_id
    
})
return res.status(200).json(response)
    }catch(error){
console.log(error)
return res.status(404).json({"error":"internal server error"})
    }
})
router.get('/project_memebers',async(req,res)=>{
    try{
const {project_id,company_id}=req.query
const projectexists=await Project_exits(project_id,company_id)
if(!projectexists)
return res.status(404).json({"error":"invalid project details"})
const response=await Project_memebers.findAll({
    where:{
        "project_id":project_id,
        "company_id":company_id
    }
})
const user_ids = response.map(item => item.user_id);

        const usernames = await Employees.findAll({
            where: {
                user_id: { [Op.in]: user_ids }
            }
        });
        const mergedData = response.map(taskUser => {
            const matchingUser = usernames.find(user => user.user_id === taskUser.user_id);
            return { ...taskUser.toJSON(), username: matchingUser ? matchingUser.username : null };
        });

        return res.status(200).json(mergedData);

    }catch(error){
console.log(error)
return res.status(404).json({"error":"internal server error"})
    }
})
module.exports=router