const express=require('express')
const Project=require('../models/Project')
const Project_members=require('../models/Project_memebers')
const Owners=require('../models/owners')
const {v4:uuidv4}= require('uuid')
const {Company_idExists,Owner_idExists,Employees_idExists_Company} =require('../forigen_keys')
const router=express.Router()
router.post('/project',async(req,res)=>{
    try{
const {owner_id,project_name,company_id,deadline}=req.body
const companyexists=await Company_idExists(company_id)
if(!companyexists)
return res.status(404).json({"error":"invalid company id"})
const ownerexists=await Owner_idExists(owner_id,company_id)
if(!ownerexists)
return res.status(404).json({"error":"invalid owner id"})

const projectid=uuidv4()
const response=await Project.create({
"project_id":projectid,
"Project_name":project_name,
"deadline":deadline,
"owner_id":owner_id,
"company_id":company_id
})
const owners_object=await Owners.findOne({
    where:{
        "owner_id":owner_id
    }
})
const memebers=await Project_members.create({
    "project_id":projectid,
    "user_id":owners_object.user_id,
    "company_id":company_id
})
return res.status(200).json(response)
    }catch(error){
        console.log(error)
        return res.status(404).json({"error":"internal server error"})

    }
})
router.get('/project',async(req,res)=>{
    try{
const {company_id,user_id}=req.query
const employeeexists=await Employees_idExists_Company(user_id,company_id)
if(!employeeexists)
return res.status(404).json({"error":"invalid user details"})
const projects=await Project.findAll({
    where:{
        company_id:company_id
    }
})
console.log(projects)
const response=await Project_members.findAll({
    where:{
        "user_id":user_id,
        'company_id':company_id
    }
})
const projectids=response.map(memeber=>memeber.project_id)
const projectsassigned=projects.filter(pros=>projectids.includes(pros.project_id))

return res.status(200).json(projectsassigned)
    }catch(error){
console.log(error)
return res.status(404).json({"error":"internal server error"})
    }
})
module.exports=router