
const Company=require('./models/company')
const Employyes=require('./models/employyes')
const Chat=require('./models/chat')
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

module.exports={Company_idExists,Employees_idExists,Chat_idexists}