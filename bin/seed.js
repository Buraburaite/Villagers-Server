const mongoose = require('mongoose');
const dotenv   = require('dotenv');

const User      = require('../models/user-model.js');

const getHash   = require('./misc.js').getHash;
const {
  createVillagers,
  addVillagersToUser,
  createPosts,
  addPostsToVillagers
} = require('./seed-promises.js');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, (err) => {
  if (err) {
    return err;
  }

  mongoose.connection.db.dropDatabase((err2) => {
    if (err2) {
      return err2;
    }

    console.log('db has been dropped');

    createSeed()
    .catch((err) => {

      console.log("Seed Error: ", err);

      mongoose.connection.close((err3) => {
        if (err3) {
          return err3;
        }

        console.log('connection has been closed by the catcher');
      });
    });
  })
});

// mongoose.connect(process.env.MONGODB_URI)
// .then(mongoose.connection.db.dropDatabase)
// .then(mongoose.connection.close)
// .then(() => console.log('here'))
// .catch((err) => console.log(err));

// /*==== PSUEDOCODE

const createSeed = () => {

  // Account credentials for a test user
  const testUser = new User({ username: 'test', password: getHash('test')});

  // Prepare a dictionary of vilname: _id pairs
  const vilDict = {};

  // Start our convoluted chain of promises
  return testUser.save()        // save user
  .then(createVillagers) // save villagers, giving them the user's id
  .then((vilDocs) => {
    vilDocs.forEach((vilDoc) => {
      vilDict[vilDoc.vilname] = vilDoc._id; // construct vilDict for later
    });
    return addVillagersToUser(vilDocs);     // save villagers' ids into the user doc
  })
  .then(createPosts)         // save posts, using vilDict to populate fields
  .then(addPostsToVillagers) // save posts' ids into villagers' docs
  .then(() => {
    console.log('connection has been closed at the end of seed');
    mongoose.connection.close();
  })
}

// ====*/










/*==== OLD PSUEDOCODE (THIS IS HAAAAAARDDDDD)

// Account credentials for a test user
const userCred = { username: 'test', password: getHash('test')};

seedVillagers() // generate villagers and posts, saving them to the database
.then((vil_ids) => {
userCred.villagers = vil_ids;  // save the villagers to the user's document
User.save(userCred);           // Save the test user to the database
})
.catch((err) => console.log(err));

====*/

// setTimeout(() => mongoose.connection.close(), 5000);
