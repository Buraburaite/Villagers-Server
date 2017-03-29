const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username : {
    type : String,
    required : [true, 'A username was not provided']
  },
  password : {
    type : String,
    required : [true, 'A password was not provided']
  },
  kind : {
    type : String,
    enum : ['Parent', 'Teacher', 'Student'],
    required : [true, 'The kind of user must be specificied ("Parent", "Teacher", or "Student")']
  },
  firstname : {
    type : String
  },
  lastname : {
    type : String
  },
  fullname : {
    type : String,
    required : [true, 'A full name was not provided']
  },
  schoolname : {
    type : String
  },
  subject : {
    type : String
  },
  profilePic : {
    type : String,
    required : [true, 'A profile picture was not provided']
  },
  students : {
    type : [ObjectId],
    ref : 'User'
  },
  parents : {
    type : [ObjectId],
    ref : 'User'
  },
  teachers : {
    type : [ObjectId],
    ref : 'User'
  },
  posts : {
    type : [ObjectId],
    ref : 'Post'
  }
},{
  timestamps : true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
