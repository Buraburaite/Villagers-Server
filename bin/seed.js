const mongoose = require('mongoose');
const dotenv   = require('dotenv');

const User      = require('../models/user-model.js');
const Post      = require('../models/post-model.js');

const addPosts  = require('./seedPosts.js');

dotenv.config();
mongoose.connect(process.env.MONGODB_URI);

users = [{
  username : 'parent1',
  password : 'super',
  kind : 'Parent',
  firstname : 'Timon',
  lastname : 'Gomez',
  fullname : 'Timon Gomez',
  profilePic : 'timon.jpg',
  students : []
},{
  username : 'parent2',
  password : 'super',
  kind : 'Parent',
  firstname : 'Pamela',
  lastname : 'Dunn',
  fullname : 'Pamela Anne Dunn',
  profilePic : 'pamela.jpg',
  students : []
},{
  username : 'parent3',
  password : 'super',
  kind : 'Parent',
  firstname : 'Dana',
  lastname : 'Holmes',
  fullname : 'Dana Holmes',
  profilePic : 'dana.jpg',
  students : []
},{
  username : 'student1',
  password : 'super',
  kind : 'Student',
  firstname : 'Sally',
  lastname : 'Gomez',
  fullname : 'Sally Gomez',
  profilePic : 'sally.jpg',
  schoolname : 'Dade Middle School',
  parents : [],
  teachers : []
},{
  username : 'student2',
  password : 'super',
  kind : 'Student',
  firstname : 'Raphael',
  lastname : 'Gomez',
  fullname : 'Raphael Gomez',
  profilePic : 'raphael.jpg',
  schoolname : 'Dade High School',
  parents : [],
  teachers : []
},{
  username : 'student3',
  password : 'super',
  kind : 'Student',
  firstname : 'Benjamin',
  lastname : 'Dunn',
  fullname : 'Benjamin Dunn',
  profilePic : 'benjamin.jpg',
  schoolname : 'Dade High School',
  parents : [],
  teachers : []
},{
  username : 'student4',
  password : 'super',
  kind : 'Student',
  firstname : 'Brendan',
  lastname : 'Holmes',
  fullname : 'Brendan Holmes',
  profilePic : 'brendan.jpg',
  schoolname : 'Dade Middle School',
  parents : [],
  teachers : []
},{
  username : 'teacher1',
  password : 'super',
  kind : 'Teacher',
  firstname : 'Samantha',
  lastname : 'Blueberry',
  fullname : 'Ms. Blueberry',
  profilePic : 'blueberry.jpg',
  schoolname : 'Dade Middle School',
  subject : 'Math',
  students : [],
  posts : []
},{
  username : 'teacher2',
  password : 'super',
  kind : 'Teacher',
  firstname : 'Terrance',
  lastname : 'Pistachie',
  fullname : 'The Pistachio',
  profilePic : 'pistachio.jpg',
  schoolname : 'Dade High School',
  subject : 'History',
  students : [],
  posts : []
}];

User.create(users, (err, userDocs) => {
  if (err) {
    console.log("User create error");
    throw err;
  }

  //Find a particular user out of an array of user documents
  function findByUsername(userArray, targetUsername) {
    return userArray.find((user) => user.username === targetUsername);
  }

  const users = {};
  users.timon        = findByUsername(userDocs, 'parent1');
  users.pamela       = findByUsername(userDocs, 'parent2');
  users.dana         = findByUsername(userDocs, 'parent3');
  users.sally        = findByUsername(userDocs, 'student1');
  users.raphael      = findByUsername(userDocs, 'student2');
  users.benjamin     = findByUsername(userDocs, 'student3');
  users.brendan      = findByUsername(userDocs, 'student4');
  users.msBlueberry  = findByUsername(userDocs, 'teacher1');
  users.thePistachio = findByUsername(userDocs, 'teacher2');

  //Seed post and comment history
  addPosts(users);

  setTimeout(() => makeConnections(users, userDocs), 2000);
});

function makeConnections(users, userDocs) {

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
  } = users;

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
  userDocs.forEach((doc) => {
    doc.save((err) => {
      if (err) {
        console.log("User save connections error");
        throw err;
      }
    });
  });
}

setTimeout(() => mongoose.connection.close(), 5000);
