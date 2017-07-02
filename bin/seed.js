const mongoose = require('mongoose');
const dotenv   = require('dotenv');

const User      = require('../models/vil-model.js');
const Villager  = require('../models/villager-model.js');
const Post      = require('../models/post-model.js');

const getHash   = require('./misc.js').getHash;

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

User.save(new User(
  {
    username: 'test',
    password: getHash('test')
  }
));

Villager.create(villagers, (err, vilDocs) => {
  if (err) {
    console.log("Villager create error");
    throw err;
  }

  vilDocs.forEach((doc) => {
    doc.save((err) => {
      if (err) {
        console.log("Villager save error");
        throw err;
      }
    });
  });
}

setTimeout(() => mongoose.connection.close(), 5000);
