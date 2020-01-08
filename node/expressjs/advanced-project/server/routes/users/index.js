const express = require('express');
const passport = require('passport');
const UserModel = require('../../models/UserModel');

const router = express.Router();

module.exports = () => {
  router.get('/registration', (req, res) => res.render('users/registration', { success: req.query.success }));

  router.post('/registration', async (req, res, next) => {
    try {
      const user = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      const userSaved = await user.save();
      if (userSaved) {
        return res.redirect('/users/registration?success=true')
      }
      return next(new Error('Failed to create a new user!'));
    } catch (err) {
      return next(err)
    }
  });

  router.get('/login', (req, res) => res.render('users/login', { error: req.query.error }));

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

  return router;
};
