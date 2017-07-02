const fs = require('fs');
const parser = require('papaparse');
const bcrypt = require('bcrypt');

const getHash = require('./misc').getHash;

// Convert 'thing1*thing2*thing3*' => ['thing1', 'thing2', 'thing3']
// removes whitespaces and also removes any empties, e.g. thing1**thing2
const starStringToList = (starString) => {
  return starString
  .split('*')
  .map((str) => str.replace(' ', ''))
  .filter((str) => str !== '');
}

// Turns a vilname into the corresponding villager obj
const populateVillager = (vilname) => {

}

// Convert a .csv file into a list of villager documents
const csvToVillagerDocs = (filepath) => {
  const fileString = fs.readFileSync(filepath).toString();
  const parsedFile = parser.parse(fileString, {
    header: true,
    dynamicTyping: true
  });

  const data = parsedFile.data;
  const vilDict = data.
  reduce(
    (dict, vil, index) => {
      dict[vil.vilname] = vil;
      return dict;
    },
    {}
  );

  data.forEach((vil) => {
    // convert their list fields into actual lists
    vil.parents  = starStringToList(vil.parents);
    vil.students = starStringToList(vil.students);
    vil.teachers = starStringToList(vil.teachers);
  })

  console.log(data);
};

readCSV(__dirname + '/csv/villagers.csv');

module.exports = { getHash };
