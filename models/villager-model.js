const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const villagerSchema = new Schema({
  vilname: {
    type: String
  },
  password: {
    type: String
  },
  kind: {
    type: String,
    enum: ['parent', 'student', 'teacher']
  },
  fullname: {
    type: String
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  school: {
    type: String
  },
  subject: {
    type: String
  },
  profilePic: {
    type: String
  },
  students: {
    type: [String]
  },
  parents: {
    type: [String]
  },
  teachers: {
    type: [String]
  },
  user: {
    type: String
  }
},{
  timestamps: true
});

const Villager = mongoose.model('Villager', villagerSchema);

module.exports = Villager;
