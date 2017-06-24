const Router     = require('express').Router;
const passport   = require('passport');
const bcrypt     = require('bcrypt');

const User       = require('../models/user-model');

const authRoutes = Router();

//======================================================================== LOGIN
// Route for securely logging in a user
authRoutes.post('/login', (req, res, next) => {

  // Passport's local strategy makes it pretty simple
  passport.authenticate('local', (err, theUser, failureDetails) => {
    // Was there an error with the authentication function?
    if (err) {
      res.status(500).json({ message: 'Something went wrong' });
      return;
    }

    // If not, then a user object should have been found
    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }

    // If one was found, then log the user
    req.login(theUser, (err) => { // passport attaches this function to req
      if (err) {
        res.status(500).json({ message: 'Something went wrong' });
        return;
      }

      // If it got to this point, it worked, so respond with the user as json
      res.status(200).json(req.user); // passport already attached user to req
    });
  }(req, res, next);
});

//======================================================================= LOGOUT
// Route for logging out a user
authRoutes.post('/logout', (req, res, next) => {
  req.logout(); // passport function
  res.status(200).json({ message: 'Successful logout' });
});

//==================================================================== LOGGED IN
// Route for checking if a user is still logged in
authRoutes.get('/loggedin', (req, res, next) => {
  // If so...
  if (req.isAuthenticated()) { // passport function
    res.status(200).json(req.user); // ...respond with the user object...
    return;
  }

  // Else, send an error response
  res.status(403).json({ message: 'Unauthorized' });
});

//======================================================================= SIGNUP
// Route for signing up a new, unique user, securely
authRoutes.post('/signup', (req, res, next) => {

  // Get their proposed credentials
  const username = req.body.username;
  const password = req.body.password;

  // Both username and password must be present
  if (!username || !password) {
    res.status(400).json({ message: 'Must provide username and password' });
    return;
  }

  // Search the database for a user with that name...
  User.findOne({ username }, '_id', (err, foundUser) => {

    // ...if found, then that user is pre-existing, so pass an error...
    if (foundUser) {
      res.status(400).json({ message: 'The username already exists' });
      return;
    }
    // ...otherwise, we can go ahead and create the account.

    // First, encrypt their password...
    const salt     = bcrypt.genSaltSync(16);
    const hashPass = bcrypt.hashSync(password, salt);

    // ...then, create a new user document to save in our database...
    const theUser = new User({ username, password: hashPass });

    // ...finally, try to save it in our database
    theUser.save((err) => {
      if (err) {
        res.status(400).json({ message: 'Something went wrong' });
        return;
      }

      // Also, we log the user into the session...
      req.login(theUser, (err) => { // passport attaches this method to req
        if (err) {
          res.status(500).json({ message: 'Something went wrong' });
          return;
        }

        // ...send a response containing the user object to the client, as json
        res.status(200).json(req.user);
      });
      }
    });
  });
});

module.exports = authRoutes;
