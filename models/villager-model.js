const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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
    type: [ObjectId],
    ref: 'Villager'
  },
  parents: {
    type: [ObjectId],
    ref: 'Villager'
  },
  teachers: {
    type: [ObjectId],
    ref: 'Villager'
  },
  posts: {
    type: [ObjectId],
    ref: 'Post'
  },
  user: {
    type: ObjectId,
    ref: 'User'
  }
},{
  timestamps: true
});

const Villager = mongoose.model('Villager', villagerSchema);

module.exports = Villager;
