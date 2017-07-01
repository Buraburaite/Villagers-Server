const Post = require('../models/post-model.js');
const getHash   = require('./misc.js').getHash;

function addVillagers(villagers) {

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
  } = villagers;

  villagers = [{
    username: 'parent1',
    password: getHash('super'),
    firstname: 'Timon',
    lastname: 'Gomez',
    fullname: 'Timon Gomez',
    profilePic: 'assets/timon.jpg',
    students: []
  },{
    username: 'parent2',
    password: getHash('super'),
    firstname: 'Pamela',
    lastname: 'Dunn',
    fullname: 'Pamela Anne Dunn',
    profilePic: 'assets/pamela.jpg',
    students: []
  },{
    username: 'parent3',
    password: getHash('super'),
    firstname: 'Dana',
    lastname: 'Holmes',
    fullname: 'Dana Holmes',
    profilePic: 'assets/dana.jpg',
    students: []
  },{
    username: 'student1',
    password: getHash('super'),
    firstname: 'Sally',
    lastname: 'Gomez',
    fullname: 'Sally Gomez',
    profilePic: 'assets/sally.jpg',
    schoolname: 'Dade Middle School',
    parents: [],
    teachers: []
  },{
    username: 'student2',
    password: getHash('super'),
    firstname: 'Raphael',
    lastname: 'Gomez',
    fullname: 'Raphael Gomez',
    profilePic: 'assets/raphael.jpg',
    schoolname: 'Dade High School',
    parents: [],
    teachers: []
  },{
    username: 'student3',
    password: getHash('super'),
    firstname: 'Benjamin',
    lastname: 'Dunn',
    fullname: 'Benjamin Dunn',
    profilePic: 'assets/benjamin.jpg',
    schoolname: 'Dade High School',
    parents: [],
    teachers: []
  },{
    username: 'student4',
    password: getHash('super'),
    firstname: 'Brendan',
    lastname: 'Holmes',
    fullname: 'Brendan Holmes',
    profilePic: 'assets/brendan.jpg',
    schoolname: 'Dade Middle School',
    parents: [],
    teachers: []
  },{
    username: 'teacher1',
    password: getHash('super'),
    firstname: 'Samantha',
    lastname: 'Blueberry',
    fullname: 'Ms. Blueberry',
    profilePic: 'assets/blueberry.jpg',
    schoolname: 'Dade Middle School',
    subject: 'Math',
    students: [],
    posts: []
  },{
    username: 'teacher2',
    password: getHash('super'),
    firstname: 'Terrance',
    lastname: 'Pistachie',
    fullname: 'The Pistachio',
    profilePic: 'assets/pistachio.jpg',
    schoolname: 'Dade High School',
    subject: 'History',
    students: [],
    posts: []
  }];

  Villager.create(pistachioPosts, (err, vil) => {
    if (err) {
      console.log("Villager pistachio create error");
      throw err;
    }

    thePistachio.posts = vil;
  });
}

module.exports = addVillagers;
