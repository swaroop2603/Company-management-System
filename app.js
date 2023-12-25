const server = require('express');
const sequelize=require('./sequelize')
const cors=require('cors');
const CompanyRouter=require('./routes/company')
const EmployeeRouter=require('./routes/employees')
const OwnerRouter=require('./routes/owners')
const Login=require('./routes/login')
const Chat=require('./routes/chat')
const Message=require('./routes/message')
const app = server();
app.use(server.json())
app.use(cors())
app.use('/CMS',CompanyRouter)
app.use('/CMS',EmployeeRouter)
app.use('/CMS',OwnerRouter)
app.use('/CMS',Login)
app.use('/CMS',Chat)
app.use('/CMS',Message)
const syncDatabase = async () => {
    try {
      await sequelize.sync({ force: false }); 
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }; 
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    syncDatabase();
  });
