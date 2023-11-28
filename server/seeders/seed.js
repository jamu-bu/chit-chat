const connection = require('../config/connection');
const { User, Chat } = require('../models');
const users = require('./userData');
// const chats = require('./chatData');

connection.once('open', async () => {
    console.log('connected');
      // Delete the collections if they exist
      let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
      if (userCheck.length) {
        await connection.dropCollection('users');
      }
  
      let chatCheck = await connection.db.listCollections({ name: 'chats' }).toArray();
      if (chatCheck.length) {
        await connection.dropCollection('chats');
      }

    await User.create(users);
    // await Chat.collection.insertMany(chats);
  
    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  });
