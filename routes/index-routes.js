const Router = require('express').Router;
const Post   = require('../models/post-model.js');

const router = Router();

indexRoutes.get('/here', (req, res, next) => {
  console.log('here route reached');
});

module.exports = router;
