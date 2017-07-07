const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: String
  },
  content: {
    type: String,
    required: [true, 'No content was provided for the comment']
  }
},{
  timestamps: true
});

const postSchema = new Schema({
  author: {
    type: String
  },
  content: {
    type: String,
    required: [true, 'No content was provided for the post']
  },
  user: {
    type: String
  },
  comments: [commentSchema]
},{
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
