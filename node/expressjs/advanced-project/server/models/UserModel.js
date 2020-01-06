/**
 * Mongoose uses schemas to define the structure and data types within a document.
 *  To create and manipulate data within a defined schema,
 *  Mongoose gives us a the concept of models.
 * A model is the programming interface that lets you create and manipulate data
 *  based on the schema.
 */

const mongoose = require('mongoose');
const emailValidator = require('email-validator');

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
}, {
    // a configuration option that makes mongoose create and add an updated time stamp for each document
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
