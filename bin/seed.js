const mongoose = require('mongoose');
const dotenv   = require('dotenv');

const User      = require('../models/vil-model.js');

const getHash   = require('./misc.js').getHash;

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

/*==== PSUEDOCODE

// Account credentials for a test user
const userCred = { username: 'test', password: getHash('test')};

// Generate default villagers
userCred.villagers = seedVillagers(userCred.username);

// Save the test user to the database
User.save(new User(userCred));

====*/

setTimeout(() => mongoose.connection.close(), 5000);
