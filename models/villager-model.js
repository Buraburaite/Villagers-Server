const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const villagerSchema = new Schema({
  username: {
    type: String,
    required: [true, 'A username was not provided']
  },
  password: {
    type: String,
    required: [true, 'A password was not provided']
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  fullname: {
    type: String,
    required: [true, 'A full name was not provided']
  },
  school: {
    type: String
  },
  subject: {
    type: String
  },
  profilePic: {
    type: String,
    required: [true, 'A profile picture was not provided']
  },
  students: {
    type: [villagerSchema],
  },
  parents: {
    type: [villagerSchema]
  },
  teachers: {
    type: [villagerSchema]
  },
  posts: {
    type: [ObjectId],
    ref: 'Post'
  }
},{
  timestamps: true
});

const Villager = mongoose.model('Villager', villagerSchema);

module.exports = Villager;
