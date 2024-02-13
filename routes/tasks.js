const express=require('express')
const Tasks=require('../models/Tasks')
const Task_users=require('../models/task_users')
const {Project_exits,Company_idExists}=require('../forigen_keys')
const {v4:uuidv4}= require('uuid')
const router=express.Router()
router.post('/tasks',async(req,res)=>{
    try{
        const {title,body,status,deadline,project_id,company_id}=req.body
        const projectexits=await Project_exits(project_id,company_id)
        const companyexists=await Company_idExists(company_id)
        if(!companyexists)
        return res.status(400).json({"error":"invalid company details"})
        if(!projectexits)
        return res.status(400).json({"error":"invalid project details"})
        const task_id=uuidv4()
        const response=await Tasks.create({
            "task_id":task_id,
            "title":title,
            "body":body,
            "status":status,
            "deadline":deadline,
            "project_id":project_id,
            "company_id":company_id
        })
        return res.status(200).json(response)
    }
    catch(error){
        console.log(error)
        return res.status(404).json({"error":"intrnal server error"})

    }
})
router.get('/tasks',async(req,res)=>{
    try{
        const {project_id,company_id}=req.query
        const projectexits=await Project_exits(project_id,company_id)
        const companyexists=await Company_idExists(company_id)
        if(!companyexists)
        return res.status(400).json({"error":"invalid company details"})
        if(!projectexits)
        return res.status(400).json({"error":"invalid project details"})
    const response=await Tasks.findAll({
        where:{
            "project_id":project_id
        }
    })
     
    return res.status(200).json(response)

    }catch(error){
        console.log(error)
        return res.status(404).json({"error":"intrnal server error"})

    }
})
router.put('/tasks',async(req,res)=>{
    try{
        
        const {task_id,title,body,status,deadline,project_id,company_id}=req.body
        console.log(project_id,company_id)
        const projectexits=await Project_exits(project_id,company_id)
        const companyexists=await Company_idExists(company_id)
        if(!companyexists)
        return res.status(400).json({"error":"invalid company details"})
        if(!projectexits)
        return res.status(400).json({"error":"invalid project details"})
        
        const response=await Tasks.update({
            
            "title":title,
            "body":body,
            "status":status,
            "deadline":deadline,
           
        },
        {where:{
            "task_id":task_id,
        }
    })
        return res.status(200).json(response)
    }
    catch(error){
        console.log(error)
        return res.status(404).json({"error":"intrnal server error"})

    }
})
router.delete('/tasks',async(req,res)=>{
    const {task_id}=req.body
    const response=await Tasks.destroy({
        where:{
            task_id:task_id
        }
    })
    return res.status(200).json("deleted success full")
})
module.exports=router


