const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const routes = require('./routes');
const auth = require('./lib/auth');
const SpeakerService = require('./services/SpeakerService');
const FeedbackService = require('./services/FeedbackService');
const AvatarService = require('./services/AvatarService');

module.exports = (config) => {
  const app = express();
  const speakers = new SpeakerService(config.data.speakers);
  const feedback = new FeedbackService(config.data.feedback);
  const avatars = new AvatarService(config.data.avatars);

  /**SECURING THE APP
   * Helmet adds some level of security to Express
   * It combines a set of middlewares that deal with known-attacks vectors on websites.
   * Helmet sets a few headers that deal with different kinds of attacks.
   * Adding it as a middleware after instantiating express
   */
  app.use(helmet());

  /**
   * TUNING EXPRESS PERFORMANCE: COMPRESSION
   * Http lets the server and the browser negotiate if
   *  the data sent by the server should be compressed or not.
   *  To enable that on the server side We will use `compress` module (a middleware).
   * After adding this middleware a browser that accepts compressed responses (and all modern browsers do)
   *  may be served a synced version of the html code, which can reduces the data to be transferred. 
   * Adding compression to the chain of middlewares (should be putted on top).
   */
  app.use(compression());

  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, './views'));

  app.locals.title = config.sitename;

  app.use('/', express.static(path.join(__dirname, '../public')));
  app.get('/favicon.ico', (req, res) => res.sendStatus(204));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(session({
    secret: "very secret sign 12345678", // sign the sessions to prevent tampering
    resave: true, // session will stay active even if it wasn't changed
    saveUninitialized: false, // to prevent getting empty objects in the database
    // Storing the session in MongoDB using `connect-mongo` module
    // Reusing the mongoose conection as mongoose remains is module global state 
    //  Once Mongoose is connected, the connection is available whenever we require mongoose.
    store: new mongoStore({ mongooseConnection: mongoose.connection }) 
  }));

  // Hooking passport
  // always do after the session middleware
  app.use(auth.initialize);
  app.use(auth.session);
  app.use(auth.setUser); // to response locals

  app.use(async (req, res, next) => {
    try {
      const names = await speakers.getNames();
      res.locals.speakerNames = names;
      return next();
    } catch (err) {
      return next(err);
    }
  });

  app.use('/', routes({ speakers, feedback, avatars}));

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  if (app.get('env') === 'development') {
    app.locals.pretty = true;
  }

  // error handler
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    res.locals.message = err.message;
    const status = err.status || 500; // If no status is provided, let's assume it's a 500
    res.locals.status = status;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(status);
    res.render('error');
  });

  return app;
};
