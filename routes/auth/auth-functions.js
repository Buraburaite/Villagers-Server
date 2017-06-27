import User from '../../models/user-model';

// Take a user document, and populates many of the fields.
// Appropriate for home page, though clearly won't scale to
// thousands of messages.
const populateUser = (userDoc) => {
  User.populate(
    // With the user's document...
    userDoc,
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
    (err2) => {
      if (err2) {
        res.status(500).json({
          message : 'Something went wrong2'
        });
      }
      res.status(200).json(userDoc);
    });
}



export default {
  populateUser
};
