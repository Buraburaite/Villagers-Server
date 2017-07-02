const mongoose = require('mongoose');
const dotenv   = require('dotenv');

const User      = require('../models/vil-model.js');

const getHash   = require('./misc.js').getHash;

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

/*==== PSUEDOCODE

// Account credentials for a test user
const userCred = { username: 'test', password: getHash('test')};

// Create the test user
User.save(new User(testUser));

// Generate default villagers for
seedVillagers(testUser.username);

====*/

setTimeout(() => mongoose.connection.close(), 5000);
