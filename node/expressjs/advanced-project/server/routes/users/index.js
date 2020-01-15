const express = require('express');
const passport = require('passport');
const UserModel = require('../../models/UserModel');
const middlewares = require('../middlewares');

const router = express.Router();

const redirectLoggedIn = (req, res, next) => {
  // Redirect the logged in user to account page
  if (req.user) {
    return res.redirect('/users/account');
  }
  return next();
};

module.exports = (args) => {
  const { avatars } = args;

  router.get('/registration',
    redirectLoggedIn,
    (req, res) => res.render('users/registration', { success: req.query.success }));

  router.post('/registration',
    /**
     * body-parser does not understand multipart encoding
     * using multer to hanlde that
     * Multer gives the uploaded result in request.files
     *  and the regular form fields in request.body
     * `upload.single`, to accept the single file upload
     *  setting the field name of the file on the form input to 'avatar'
     */
    middlewares.upload.single('avatar'),
    middlewares.handleAvatars(avatars),
    async (req, res, next) => {
      try {
        const user = new UserModel({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        });
        if (req.file && req.file.storedFilename) {
          user.avatar = req.file.storedFilename;
        }

        const userSaved = await user.save();
        if (userSaved) {
          return res.redirect('/users/registration?success=true')
        }
        return next(new Error('Failed to create a new user!'));
      } catch (err) {
        if (req.file && req.file.storedFilename) {
          await avatars.delete(req.file.storedFilename);
        }
        return next(err);
      }
    });

  router.get('/login',
    redirectLoggedIn,
    (req, res) => res.render('users/login', { error: req.query.error }));

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login?error=true',
  }));

  /**
   * passport automatically adds a function logout to the request object. 
   * Behind the scenes it will clear the login session.
   */
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })

  router.get('/account', (req, res, next) => {
    if (!req.user) {
      return res.status(403).redirect('/');
    }
    return next();
  }, (req, res) => res.render('users/account', { user: req.user }));

  // Sending avatar image file to the browser through /users/avatar/<img>.png
  router.get('/avatar/:filename', (req, res) => {
    // Setting Content-Type response header to tell the browser which image type it has to expect
    res.type('png');
    return res.sendFile(avatars.filepath(req.params.filename));
  });

  // Sending thumbnail of user avatar
  router.get('/avatartn/:filename', async (req, res, next) => {
    try {
      res.type('png');
    // passing the binary buffer
    const thumbn = await avatars.thumbnail(req.params.filename); 
    return res.end(thumbn, 'binary');
    } catch (err) {
      return next(err)
    }
  });

  return router;
};
