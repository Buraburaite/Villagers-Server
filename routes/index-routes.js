const Router = require('express').Router;
const Post   = require('../models/post-model.js');

const router = Router();

  // not sure this is secure, we're not checking a user object yet I think?
  // router.get('/posts/:id', (req, res, next) => {
  //   const id = req.params.id;
  //
  //   Post.findOne({ _id : id }, (err, foundPost) => {
  //     if (err) {
  //       res.status(500).json({
  //         message : 'Api failed to find that post'
  //       });
  //     }
  //
  //     if (foundPost) {
  //       res.status(200).json(foundPost);
  //     } else {
  //       res.status(500).json({
  //         message: 'Api failed to find that post'
  //       });
  //     }
  //   });
  //
  // });

  module.exports = router;
