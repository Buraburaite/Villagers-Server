const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const Mixed    = Schema.Types.Mixed;

const commentSchema = new Schema({
  author: {
    type: Mixed,
    ref: 'Villager'
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
    type: Mixed,
    ref: 'Villager'
  },
  subscribers: {
    type: [Mixed],
    ref: 'Villager'
  },
  content: {
    type: String,
    required: [true, 'No content was provided for the post']
  },
  comments: [commentSchema]
},{
  timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
