const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/UserModel');

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (username, password, callback) => {
    try {
      const user = await UserModel.findOne({ email: username }).exec(); // exec to get a real promise back
      const noError = null;
      const userFound = true;

      if (!user) {
        return callback(noError, !userFound, { message: 'Invalid email or password' })
      }

      const passwordOk = await user.comparePassword(password);
      if (!passwordOk) {
        return callback(noError, !userFound, { message: 'Invalid email or password' })
      }

      // a valid user with a valid password
      return callback(noError, user);

    } catch (err) {
      return callback(err)
    }
  }
));

/**
 * Implement the serialization and de-serialization functions to save and retrieve users from a session.
 * DO NOT store the whole user object, because when a user is deleted or data is changed,
 *  the stored user object in the session will still the same.
 * Just store the user ID and use it to retrieve the user from the database
 *  for every time the session is loaded.
 */
passport.serializeUser((user, callback) => callback(null, user._id));
passport.deserializeUser( async (id, callback) => {
  try {
    const user = await UserModel.findById(id).exec();
    return callback(null, user);
  } catch (err) {
    return callback(err)
  }
});

module.exports = {
  initialize: passport.initialize(),
  session: passport.session(),
  setUser: (req, res, next) => {
    res.locals.user = req.user;
    return next();
  },
};
