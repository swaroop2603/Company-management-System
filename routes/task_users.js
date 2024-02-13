const express=require('express')
const Task_users=require('../models/task_users')
const Employees=require('../models/employyes')
const {Project_exits,Tasks_exits,Company_idExists,user_idExists_project,Employees_idExists_Company}=require('../forigen_keys')
const { Op } = require('sequelize');
const router=express.Router()
router.post('/tasks_users',async(req,res)=>{
    try{
        const {task_id,user_id,project_id,company_id}=req.body
       
        const employeevalid=await Employees_idExists_Company(user_id,company_id)
        
        const uservalid=await user_idExists_project(user_id,project_id)
        
        const companyexists=await Company_idExists(company_id)
        
        const taskexists=await Tasks_exits(task_id,project_id)
        
        const projectexists=await Project_exits(project_id,company_id)
        
        if(!employeevalid)
        return res.status(400).json({'error':"invalid employee"})
        
        if(!uservalid)
        return res.status(400).json({'error':"invalid user"}) 
        
        if(!companyexists)
        return res.status(400).json({'error':"invalid company"})
        
        if(!taskexists)
        return res.status(400).json({'error':"invalid task"})
        
        if(!projectexists)
        return res.status(400).json({'error':"invalid project"}) 
        
        const response=await Task_users.create({
        "task_id":task_id,
        "user_id":user_id,
        "project_id":project_id,
        "company_id":company_id
    })   
    return res.status(200).json(response)
    }catch(error){
        console.log(error)
        return res.status(404).json({"error":"internal server error"})
    }
})
router.get('/tasks_users',async(req,res)=>{
    try{
        const {task_id,project_id}=req.query
        const response=await Task_users.findAll({
            where:{
                "task_id":task_id,
                "project_id":project_id
            }
        })
        console.log(response)
        
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
router.delete('/tasks_users',async(req,res)=>{
    try{
        const {user_id}=req.query
        const response=await Task_users.destroy({
            where:{
                user_id:user_id
            }
        })
        res.status(200).json("deleted successfully")

    }catch(error){
        res.status(404).json({"error":"failed"})

    }
})
module.exports=router
