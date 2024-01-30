const server = require('express');
// const socketio=require('socket.io')
const http=require('http')
const sequelize=require('./sequelize')
const cors=require('cors');
const CompanyRouter=require('./routes/company')
const EmployeeRouter=require('./routes/employees')
const OwnerRouter=require('./routes/owners')
const Login=require('./routes/login')
const Chat=require('./routes/chat')
const Message=require('./routes/message')
const Channel=require('./routes/channels')
const Channel_Chat=require('./routes/channel_chat')
const Channel_Users=require('./routes/channel_users')
const invite=require('./routes/invite')
const resetlink=require('./routes/forgetpassword')
const app = server();
const server_http=http.createServer(app)
const {v4:uuidv4}= require('uuid');
const { channel } = require('diagnostics_channel');
require('dotenv').config();

const io = require('socket.io')(server_http, { cors: { origin: "*" } });

app.use(server.json())
io.on('connection',(socket)=>{
  
  console.log('we have a new connection')
  // socket.on('chat',({name,room},callback)=>{
    
  // })
  // socket.on('diconnect',()=>{
  //   console.log('user had left')
  // })
  socket.on('sendMessage',(message_id,message,user,chat_id,callback)=>{
    const datet = new Date();
    console.log("message on socket",message,user,chat_id)
    socket.join(chat_id)
    io.to(chat_id).emit('message',{chat_id:chat_id,message_id:message_id,user_id:user,created_at:datet,message:message});
    // callback()
  
  })
  socket.on('sendMessageChannel',(message_id,message,user,channel_id,callback)=>{
    const datet = new Date();
    console.log("message on socket",message,user,channel_id)
    socket.join(channel_id)
    io.to(channel_id).emit('messagechannel',{channel_id:channel_id,message_id:message_id,user_ID:user,created_at:datet,message:message});
    // callback()
  
  })
  socket.on('userjoined',(channel_id,username)=>{
    socket.join(channel_id)
    io.to(channel_id).emit('joinedmessage',{message:`${username} has joined`})
  })
})

app.use(cors())
app.use('/CMS',CompanyRouter)
app.use('/CMS',EmployeeRouter)
app.use('/CMS',OwnerRouter)
app.use('/CMS',Login)
app.use('/CMS',Chat)
app.use('/CMS',Message)
app.use('/CMS',Channel)
app.use('/CMS',Channel_Chat)
app.use('/CMS',Channel_Users)
app.use('/CMS',invite)
app.use('/CMS',resetlink)
const syncDatabase = async () => {
    try {
      await sequelize.sync({ force: false }); 
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }; 
  const PORT = process.env.PORT || 5001;
  main_server=server_http.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    syncDatabase();
  });
  