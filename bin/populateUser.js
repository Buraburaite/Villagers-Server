const Villager  = require('../models/villager-model.js');
const Post      = require('../models/post-model.js');

const populateUser = (username) => {

  return new Promise((resolve, reject) => {

    const populatedUser = { username };

    Villager.find({ user: username })
    .then((vilDocs) => {
      populatedUser.villagers = vilDocs;
      return Post.find({ user: username })
    })
    .then((postDocs) => {
      populatedUser.posts = postDocs;
      return populatedUser;
    })
    .then(resolve)
    .catch(reject);
  });
};


module.exports = populateUser;
