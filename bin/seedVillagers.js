const fs = require('fs');
const parser = require('papaparse');

// Create villagers for the user
const seedVillagers = (username) => {

  // Get data out of our .csv files
  const villagers = readCSV(__dirname + '/csv/villagers.csv');
  const posts     = readCSV(__dirname + '/csv/posts.csv');
  const comments  = readCSV(__dirname + '/csv/comments.csv');

  // Create a dictionary of villagers
  const vilDict = villagers.
  reduce(
    (dict, vil) => {
      dict[vil.vilname] = vil;
      return dict;
    },
    {}
  );

  villagers.forEach((vil) => {
    // Add their user field
    vil.user = username;

    // Convert their list fields into actual lists
    vil.parents  = starStringToList(vil.parents);
    vil.students = starStringToList(vil.students);
    vil.teachers = starStringToList(vil.teachers);
  })

  console.log(villagers);

};
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
