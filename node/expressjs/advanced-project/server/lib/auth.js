const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../models/UserModel');

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (username, password, callback) => {
        try {
            const user = UserModel.findOne({ email: username }).exec(); // exec to get a real promise back
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

module.exports = {
    initialize: passport.initialize(),
    session: passport.session(),
    setUser: (req, res, next) => {
        res.locals.user = req.user;
        return next();
    },
};
