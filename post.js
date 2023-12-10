const {pool} = require('./db')

async function Company(company_id,company_name){
    const connection= await pool.getConnection()
    try{
        await connection.query(
            `INSERT INTO Company (company_id,company_name)
            VALUES(?,?);
            `,[company_id,company_name]);
            console.log("items added successfully")
        
    }
    catch(error){
        console.log("failed to add",error)
    }
    finally{
        connection.release();
    }

}
async function Employyes(user_id,email,user_name,password,company_id){
    const connection=await pool.getConnection()
    try{
        await connection.query(`
        INSERT INTO EMPLOYEES (user_id,email,user_name,password,company_id)
        VALUES(?,?,?,?,?);
        `,[user_id,email,user_name,password,company_id])
        
        
    }catch(error){
        console.log("failed",error)
    }
    finally{
        connection.release();
    }
}
async function Owners(owner_id,company_id,user_id){
    const connection=await pool.getConnection();
    try{
        await connection.query(`
        INSERT INTO OWNERS(owner_id,company_id,user_id)
        VALUES(?,?,?);
        `,[owner_id,company_id,user_id])
    }catch(error){
        console.log(error)
    }
    finally{
        connection.release()
    }
}
module.exports= {Company,Employyes,Owners}
