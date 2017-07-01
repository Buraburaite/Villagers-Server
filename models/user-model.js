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
  }
},{
  timestamps : true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
