const Villager  = require('../models/villager-model.js');
const Post      = require('../models/post-model.js');

// Populate the User doc with its corresponding
// villagers and their posts
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
