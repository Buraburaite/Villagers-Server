const mongoose = require('mongoose');
const dotenv   = require('dotenv');

const createUser = require('./createUser.js');

dotenv.config();

// Configure and initialize mongoose middleware
require('../config/mongoose-setup')(mongoose);

// Connect to our local database
mongoose.connect(process.env.MONGODB_URI,
  { useMongoClient: true }, // quiets an error in Mongoose >= 4.11.0
  (err) => {
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
