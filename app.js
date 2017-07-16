const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const dotenv       = require('dotenv');
const cors         = require('cors');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const passport     = require('passport');

dotenv.config();

// Configure and initialize mongoose middleware
mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });
require('./config/mongoose-setup')(mongoose);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Villagers Server';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

// If we're in development, expose our database to angular's port
if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200', 'http://localhost:8000']
  }));
}
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60000 * 24 }, // thought: is this a day or 24 minutes?
  store: new MongoStore({
    mongooseConnection : mongoose.connection,
    ttl: 24 * 60 * 60 // que pinga es esto?
  }),
  resave: true,
  saveUninitialized: true
}));

// Configure and initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport-setup')(passport);

//========================================================================ROUTES
const indexRoutes = require('./routes/index-routes');
app.use('/', indexRoutes);
const authRoutes = require('./routes/auth-routes');
app.use('/', authRoutes);

//====================================================================ERROR-PAGE

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
