/**
 * Mongoose uses schemas to define the structure and data types within a document.
 *  To create and manipulate data within a defined schema,
 *  Mongoose gives us a the concept of models.
 * A model is the programming interface that lets you create and manipulate data
 *  based on the schema.
 */

const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 12;
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: { unique: true },
        validate: {
            validator: emailValidator.validate,
            message: props => 
                `${props.value} is not a valid email address`,
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    avatar: {
        type: String
    }
}, {
    // a configuration option that makes mongoose create and add an updated time stamp for each document
    timestamps: true,
});

/**
 * pre 'save' -> a function that will run every save for document
 * NOTIC: we can't use arrow function in the callback because we want to use `this` keyword
 */
UserSchema.pre('save', async function preSave(next) {
    const user = this;
    const passwordModified = user.isModified('password');
    if (!passwordModified) { return next() }
    
    try {
        const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
        user.password = hash;
        return next();
    } catch (err) {
        return next(err)
    }
});

/**
 * Mongoose way to create instance method:
 *  a method that will be available on every document that comes from the database.
 */
UserSchema.methods.comparePassword= async function comparePassword(candidate) {
    // compares in a linear time
    return bcrypt.compare(candidate, this.password);
}

module.exports = mongoose.model('User', UserSchema);
