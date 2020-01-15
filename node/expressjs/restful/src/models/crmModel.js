import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: 'First name is required'
    },
    lastName: {
        type: String,
        required: 'Last name is required'
    },
    email: {
        type: String,
    }, 
    company: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
