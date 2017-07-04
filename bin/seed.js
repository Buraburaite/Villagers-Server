const mongoose = require('mongoose');
const dotenv   = require('dotenv');

const createUser = require('./createUser.js');

dotenv.config();

// Connect to our local database
mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    return err;
  }

  // Drop it like it's hot (this feels like a very dangerous file now...)
  mongoose.connection.db.dropDatabase((err2) => {
    if (err2) {
      return err2;
    }

    console.log('db has been dropped');

    // Create a test user named 'test' with password 'test'
    createUser('test', 'test')
    .then(() => {
      mongoose.connection.close();
      console.log('seed created successfully');
    })
    .catch((err3) => {
      mongoose.connection.close();
      console.log(err3);
    });
  })
});
