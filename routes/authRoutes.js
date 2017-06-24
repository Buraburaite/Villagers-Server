const Router     = require('express').Router;
const passport   = require('passport');
const bcrypt     = require('bcrypt');

const User       = require('../models/user-model');

const authRoutes = Router();
