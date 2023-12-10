// app.js
const sequelize = require('./sequelize');
const User = require('./model');

async function run() {
    try {
      // Synchronize the model with the database
      await User.sync();
  
      // Example: create a new user
      const newUser = await User.create({
        username: 'john_doe',
        email: 'john@example.com',
        password: 'hashed_password', // Note: You should hash the password in a real-world scenario
      });
  
      console.log('User created:', newUser.toJSON());
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Close the database connection when done
      await sequelize.close();
    }
  }
  
  // Run the application
  run();