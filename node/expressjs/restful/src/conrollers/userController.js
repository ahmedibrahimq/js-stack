import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserSchema } from "../models/userModel";

const User = mongoose.model('User', UserSchema);

export const register = (req, res) => {
    const newUser = new User(req.body);

    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
        if (err)
            return res.status(400).send({ message: err })
        else {
            /**
             *  undefining the hashPassword
             *   The user's password is already hashed and saved in the database.
             *   We'll send a response back saying we've created a user with this information
             *    We don't want to send the hashPassword in the response.
             */
            const hidePassword = undefined;
            user.hashPassword = hidePassword;
            return res.json(user);
        }
    });
};

export const login = (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. No user found!' });
        } else if (user) {
            if (!user.compairePassword(req.body.password, user.hashPassword)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password!' });
            } else
                res.json({
                    token: jwt.sign({
                        email: user.email,
                        username: user.username,
                        _id: user.id
                    }, 'Very Secret')
                });
        }
    });
};

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).json({ message: 'Unauthorized user!' });
    }
};
