const User = require('../../models/user-model');

// Take a user document, and populates many of the fields.
// Appropriate for home page, though clearly won't scale to
// thousands of messages.
const populateUser = (userDoc) => {
  // Return a promise for a populated user doc...
  return User.populate(
    // ..first, take the user's document...
    userDoc,
    // ...populate using these options...
    {
      // ...populate their students, except for their password...
      path: 'students', select: '-password', populate: {
        // ...as well as the students' teachers...
        path: 'teachers', select: '-password', populate: {
          // ...the students' teachers' posts...
          path: 'posts', model: 'Post', populate: {
            // ...as well as all the users related to each post.
            path: 'author comments.author subscribers', select: '-password', model: 'User'
          }
        }
      }
    },
    // ...finally, execute this callback
    (err, populatedDoc) => {
      if (err) {
        throw new Error('Failed to populate user document');
      }
    }
  );
};

module.exports = {
  populateUser
};
