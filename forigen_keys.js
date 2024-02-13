
const Company=require('./models/company')
const Employyes=require('./models/employyes')
const Chat=require('./models/chat')
const Owner=require('./models/owners')
const Channel=require('./models/channel')
const Project=require('./models/Project')
const Project_Members=require('./models/Project_memebers')
const Tasks=require('./models/Tasks')
async function Company_idExists(company_id) {
    try{
        const company=await Company.findByPk(company_id)
        return !!company
    }
    catch(error){
        console.log(error)
        throw error
    }
}
async function Owner_idExists(owner_id,company_id){
    try{
        const owner=await Owner.findByPk(owner_id)
        console.log(owner)
        if(owner.company_id===company_id){

            return true
            }
    
            return false
    }
    catch(error){
        console.log(error)
        throw error
    }
}
async function Employees_idExists(user_id){
    try{
        const emploees=await Employyes.findByPk(user_id)
        return !!emploees
    }
    catch(error){
        console.log(error)
        throw error
    }
}

async function Employees_idExists_Company(user_id,company_id){
    try{
        const employees=await Employyes.findByPk(user_id)
        console.log(employees)
        console.log(company_id)
        if(employees.company_id===company_id){

        return true
        }

        return false
    }
    catch(error){
        console.log(error)
        throw error
    }
}

async function Employees_mailExists_Company(mail_id,company_id){
    try{
        const employees=await Employyes.findOne({
            where:{
                email:mail_id
            }
        })
        console.log(employees)
        console.log(company_id)
        if(!employees){
            return false
        }
        if(employees.company_id===company_id){

        return true
        }

        return false
    }
    catch(error){
        console.log(error)
        throw error
    }
}
async function Employees_mailExists(mail_id){
    try{
        const employees=await Employyes.findOne({
            where:{
                email:mail_id
            }
        })
        console.log(employees)
        return !!employees
    }
    catch(error){
        console.log(error)
        throw error
    }
}
async function Chat_idexists(chat_id){
    try{
        const chat=await Chat.findByPk(chat_id)
        return !!chat
    }
    catch(error){
        console.log(error)
        throw error
    }
}
async function channel_idexists(channel_id){
    try{
        const channel=await Channel.findByPk(channel_id)
        return !!channel
    }catch(error){
        console.log(error)
        throw error
    }
}
async function Project_exits(project_id,company_id){
    try{
const project=await Project.findOne({
    where:{
        "project_id":project_id,
        "company_id":company_id
    }
})
return !!project
    }catch(error){
        console.log(error)
        throw error

    }
}
async function user_idExists_project(user_id,project_id){
    try{
        const memebers=await Project_Members.findOne({
            where:{
                "user_id":user_id,
                "project_id":project_id
            }
        })
       
        

        return !!memebers
    }
    catch(error){
        console.log(error)
        throw error
    }
}
async function Tasks_exits(task_id,project_id){
    try{
const tasks=await Tasks.findOne({
    where:{
        "project_id":project_id,
        "task_id":task_id
    }
})
return !!task_id
    }catch(error){
        console.log(error)
        throw error

    }
}
module.exports={Company_idExists,Employees_mailExists,Employees_idExists,Chat_idexists,Employees_idExists_Company, Owner_idExists,channel_idexists,Employees_mailExists_Company,Project_exits,user_idExists_project,Tasks_exits}