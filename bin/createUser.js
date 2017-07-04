const bcrypt = require('bcrypt');
const fs = require('fs');
const parser = require('papaparse');

const User      = require('../models/user-model.js');
const Villager  = require('../models/villager-model.js');
const Post      = require('../models/post-model.js');

const createUser = (username, password) => {

  console.log('creating a new user...');

  // Account credentials for a test user
  const newUser = new User({
    username,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(16))
  });

  // Make the user and their village
  return newUser.save()
  .then(createVillagers) // requires the userDoc be passed
  .then(createPosts)
}

//=====================================================================-PROMISES
const createVillagers = (userDoc) => {

  console.log('creating villagers...');

  const vilDocs = readCSV(__dirname + '/csv/villagers.csv');

  vilDocs.forEach((vil) => {
    // Add the user
    vil.user = userDoc.username;

    // Convert their list fields into actual lists
    vil.parents  = starStringToList(vil.parents);
    vil.students = starStringToList(vil.students);
    vil.teachers = starStringToList(vil.teachers);
  });

  return Villager.create(vilDocs);
};

const createPosts = (vilDocs) => {

  console.log('creating posts...');

  const postDocs    = readCSV(__dirname + '/csv/posts.csv');

  /*====
  posts.csv has extra fields for the comments. Here, we put the comments into a
  list and map each post to a new object without the extra fields, and with the
  list instead, as described in the Post model.
  ====*/
  for (let i = 0; i < postDocs.length; i++) {

    let post = postDocs[i];

    let comments = [];
    let commentCount = 0;
    while (true) {
      commentCount++;
      let author  = post[`com${commentCount}-author`];
      let content = post[`com${commentCount}-content`];

      if (author) {
        comments.push({ author, content });
        continue;
      }

      break;
    }

    postDocs[i] = {
      author: post.author,
      content: post.content,
      comments
    };
  };

  return Post.create(postDocs);
};

//======================================================================-HELPERS
// Convert a .csv file into a list of villager documents
const readCSV = (filepath) => {
  // Get the filestring
  const fileString = fs.readFileSync(filepath).toString();

  // Pass it through PapaParser with our settings
  const parsedFile = parser.parse(fileString, {
    header: true,       // converts from json to an object with header keys
    dynamicTyping: true // auto-converts numbers and booleans from strings
  });

  return parsedFile.data;
};

// Convert 'thing1*thing2*thing3*' into ['thing1', 'thing2', 'thing3']
// also removes whitespaces and any empty strings, e.g. thing1**thing2
const starStringToList = (starString) => {
  return starString
  .split('*')
  .map((str) => str.replace(' ', ''))
  .filter((str) => str !== '');
}

module.exports = createUser;
