const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const dotenv   = require('dotenv');

const User      = require('../models/vil-model.js');
const Villager  = require('../models/villager-model.js');
const Post      = require('../models/post-model.js');

const getHash   = require('./misc.js').getHash;
const addPosts  = require('./seedPosts.js');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

User.save(new User({ username: 'test', password: getHash('test')}))

Villager.create(villagers, (err, vilDocs) => {
  if (err) {
    console.log("User create error");
    throw err;
  }

  //Find a particular vil out of an array of vil documents
  function findByUsername(vilArray, targetUsername) {
    return vilArray.find((vil) => vil.username === targetUsername);
  }

  const vils = {};
  vils.timon        = findByUsername(vilDocs, 'parent1');
  vils.pamela       = findByUsername(vilDocs, 'parent2');
  vils.dana         = findByUsername(vilDocs, 'parent3');
  vils.sally        = findByUsername(vilDocs, 'student1');
  vils.raphael      = findByUsername(vilDocs, 'student2');
  vils.benjamin     = findByUsername(vilDocs, 'student3');
  vils.brendan      = findByUsername(vilDocs, 'student4');
  vils.msBlueberry  = findByUsername(vilDocs, 'teacher1');
  vils.thePistachio = findByUsername(vilDocs, 'teacher2');

  //Seed post and comment history
  addPosts(vils);

  setTimeout(() => makeConnections(vils, vilDocs), 2000);
});

function makeConnections(vils, vilDocs) {

  const {
    msBlueberry,
    thePistachio,
    timon,
    pamela,
    dana,
    sally,
    brendan,
    raphael,
    benjamin
  } = vils;

  //Give parents their students
  timon. students.push(sally._id, raphael._id);
  pamela.students.push(benjamin._id);
  dana.  students.push(brendan._id);

  //Give students their parents
  sally.   parents.push(timon._id);
  brendan. parents.push(dana._id);
  raphael. parents.push(timon._id);
  benjamin.parents.push(pamela._id);

  //Give students their teachers
  sally.   teachers.push(msBlueberry._id);
  brendan. teachers.push(msBlueberry._id);
  raphael. teachers.push(thePistachio._id);
  benjamin.teachers.push(thePistachio._id);

  //Give teachers their students
  msBlueberry.students.push(sally._id, brendan._id);
  thePistachio.students.push(raphael._id, benjamin._id);

  //Save the new connections
  vilDocs.forEach((doc) => {
    doc.save((err) => {
      if (err) {
        console.log("Villager save connections error");
        throw err;
      }
    });
  });
}

setTimeout(() => mongoose.connection.close(), 5000);
