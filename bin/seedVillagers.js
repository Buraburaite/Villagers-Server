const fs = require('fs');
const parser = require('papaparse');

const Villager = require('../models/villager-model.js');

//================================================================-SEEDVILLAGERS
// Create villagers for the user
const seedVillagers = () => {

  // Get data out of our .csv files
  const villagers = readCSV(__dirname + '/csv/villagers.csv');
  const posts     = readCSV(__dirname + '/csv/posts.csv');
  const comments  = readCSV(__dirname + '/csv/comments.csv');

  villagers.forEach((vil) => {

    // Convert their list fields into actual lists
    vil.parents  = starStringToList(vil.parents);
    vil.students = starStringToList(vil.students);
    vil.teachers = starStringToList(vil.teachers);
  })

  console.log(villagers);

  // Prepare a dictionary of vilname: _id pairs
  const vilDict = {};

  // Save the villagers to the database
  Villager.create(villagers)
  .then((vilDocs) => {
    vilDocs.forEach((vilDoc) => {
      vilDict[vilDoc.name] = vilDoc._id;
    });
  });

  // Return a promise for a list of the villagers' ids

};


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

seedVillagers('test');

module.exports = seedVillagers;

// Testing how circular stuff works
// a = {};
// b = { obj : a };
// a.obj = b;
//
// console.log(a);
