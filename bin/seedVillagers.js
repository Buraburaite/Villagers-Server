const fs = require('fs');
const parser = require('papaparse');

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

// Turns a vilname into the corresponding villager obj
const populateVillager = (vilname) => {

}

const seedVillagers = (username) => {

  const data = readCSV(__dirname + '/csv/villagers.csv')

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

module.exports = seedVillagers;
