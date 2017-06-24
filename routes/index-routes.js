const Router = require('express').Router;
const User   = require('../models/user-model.js');
const Post   = require('../models/post-model.js');

const router = Router();

router.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username : username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({
        message : 'Something went wrong1'
      });
    }

    if (foundUser) {
      if (foundUser.password === password) {

        User.populate(
          foundUser,
          {
            path: 'students', select: '-password', populate: {
              path: 'teachers', select: '-password', populate: {
                path: 'posts', model: 'Post', populate: {
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
            res.status(200).json(foundUser);
          });
        }
        else {
          res.status(500).json({
            message: 'Something went wrong3'
          });
        }
      } else {
        res.status(500).json({
          message: 'Something went wrong4'
        });
      }
    });

  });

  // not sure this is secure, we're not checking a user object yet I think?
  router.get('/posts/:id', (req, res, next) => {
    const id = req.params.id;

    Post.findOne({ _id : id }, (err, foundPost) => {
      if (err) {
        res.status(500).json({
          message : 'Api failed to find that post'
        });
      }

      if (foundPost) {
        res.status(200).json(foundPost);
      } else {
        res.status(500).json({
          message: 'Api failed to find that post'
        });
      }
    });

  });

  module.exports = router;
