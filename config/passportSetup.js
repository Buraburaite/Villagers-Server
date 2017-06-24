const LocalStrategy = require('passport-local').Strategy;
const User          = require('../models/user-model');
const bcrypt        = require('bcrypt');

module.exports = function (passport) {

  passport.use(new LocalStrategy((username, password, next) => {
    // Find the user in our database...
    User.findOne({ username }, (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      // ...if no user of that name exists, pass an error...
      if (!foundUser) {
        next(null, false, { message: 'Incorrect username' }); // As far as I can tell, next should only take one param (the error);
        return;
      }

      // ...if their password doesn't match, pass an error...
      if (!bcrypt.compareSync(password, foundUser.password)) { // can we make this asynchronous? leave error checking in cb
        next(null, false, { message: 'Incorrect password' });
        return;
      }

      // ... otherwise, return the user object...
      next(null, foundUser);
    });
  }));

  // Add the user's id into our session
  passport.serializeUser((userToLogIn, done) => {
    done(null, userToLogIn._id); // callback exposed by passport, to ass stuff if we want
  });

  // Grab the user's object from the database
  passport.deserializeUser((userIdFromSession, done) => {
    User.findById(userIdFromSession, (err, userDocument) => {
      if (err) {
        done(err);
        return;
      }

      done(null, userDocument);
    });
  });

}
