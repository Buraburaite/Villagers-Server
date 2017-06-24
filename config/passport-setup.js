const User          = require('../models/user-model');
const bcrypt        = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {

  // Add the user's id into our session
  passport.serializeUser((userToLogIn, done) => {

    /* Space for additional stuff, if we want */

    done(null, userToLogIn._id); // callback required by passport
  });

  // Grab the user's object from the database
  passport.deserializeUser((userIdFromSession, done) => {

    User.findById(userIdFromSession, (err, userDocument) => {
      if (err) {
        done(err);
        return;
      }

      /* Space for additional stuff, if we want */

      done(null, userDocument); // callback required by passport
    });
  });

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

      // ... otherwise, pass the user object...
      next(null, foundUser);
    });
  }));


  // Example code for social login, implementing later on
  // passport.use(new FBStrategy({
  //   clientID: process.env.FB_CLIENT_ID,
  //   clientSecret: process.env.FB_CLIENT_SECRET,
  //   callbackURL: process.env.HOST_ADDRESS + '/auth/facebook/callback',
  // }, (accessToken, refreshToken, profile, done) => {
  //   done(null, profile);
  // }
  // ));
  //
  // passport.use(new GoogleStrategy({
  //   clientID: process.env.GOOGLE_CLIENT_ID,
  //   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  //   callbackURL: process.env.HOST_ADDRESS + '/auth/google/callback',
  // }, (accessToken, refreshToken, profile, done) => {
  //   done(null, profile);
  // }
  // ));

}
