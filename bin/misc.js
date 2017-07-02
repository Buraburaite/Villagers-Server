const fs = require('fs');
const parser = require('papaparse');
const bcrypt = require('bcrypt');

const getHash = (pw) => bcrypt.hashSync(pw, bcrypt.genSaltSync(16));

const starStringToList = (starString) => {
  return starString
  .split('*')
  .map((str) => str.replace(' ', ''))
  .filter((str) => str !== '');
}

const populateVillager = (starString) => {
  return starString
  .split('*')
  .map((str) => str.replace(' ', ''))
  .filter((str) => str !== '');
}

const readCSV = (filepath) => {
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
    // hash their password
    // vil.password = getHash(vil.password);

    // convert their list fields into actual lists
    vil.parents  = starStringToList(vil.parents);
    vil.students = starStringToList(vil.students);
    vil.teachers = starStringToList(vil.teachers);
  })

  console.log(data);
};

console.log(__dirname);
readCSV(__dirname + '/csv/villagers.csv');

module.exports = { getHash };
