const fs = require('fs');
const parser = require('papaparse');

const User      = require('../models/user-model.js');
const Villager  = require('../models/villager-model.js');
const Post      = require('../models/post-model.js');

//======================================================================-HELPERS
// Convert a .csv file into a list of villager documents
const readCSV = (filepath) => {
  // Get the filestring
  const fileString = fs.readFileSync(filepath).toString();

  // Pass it through PapaParser with our settings
  const parsedFile = parser.parse(fileString, {
    header: true,       // converts from json to an obj with header keys
    dynamicTyping: true // auto-converts numbers and booleans from strings
  });

  return parsedFile.data;
};

// Convert 'thing1*thing2*thing3*' into ['thing1', 'thing2', 'thing3']
// also removes whitespaces any empty strings, e.g. thing1**thing2
const starStringToList = (starString) => {
  return starString
  .split('*')
  .map((str) => str.replace(' ', ''))
  .filter((str) => str !== '');
}

const createVillagers = (userDoc) => {

  console.log('user has been created');

  const vilDocs = readCSV(__dirname + '/csv/villagers.csv');

  vilDocs.forEach((vil) => {
    // Add the user
    vil.user = userDoc._id;

    // Convert their list fields into actual lists
    vil.parents  = starStringToList(vil.parents);
    vil.students = starStringToList(vil.students);
    vil.teachers = starStringToList(vil.teachers);
  });

  return Villager.create(vilDocs);
};

const addVillagersToUser = (vilDocs) => {

  console.log('villagers have been created');

};

const createPosts = () => {};
const addPostsToVillagers = (postDocs) => {};


module.exports = {
  createVillagers,
  addVillagersToUser,
  createPosts,
  addPostsToVillagers
}
