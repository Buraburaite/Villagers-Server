const Router = require('express').Router;

const indexRoutes = Router();

indexRoutes.get('/here', (req, res, next) => {
  console.log('here route reached');
});

module.exports = indexRoutes;
