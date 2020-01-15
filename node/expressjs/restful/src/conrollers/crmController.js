import mongoose from 'mongoose';
import { ContactSchema } from "../models/crmModel";

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = (req, res) => {
    let newContact = new Contact(req.body);

    newContact.save((err, contact) => {
        if (err)
            res.send(err)
        res.json(contact);
    });
};

export const getContacts = (req, res) => {
    const getAll = {};
    Contact.find(getAll, (err, contact) => {
        if (err)
            res.send(err)
        res.json(contact);
    });
};

export const getContactWithId = (req, res) => {
    Contact.findById(req.params.contactId, (err, contact) => {
        if (err)
            res.send(err)
        res.json(contact);
    });
};

export const updateContact = (req, res) => {
    Contact.findOneAndUpdate(
        // key
        { _id: req.params.contactId },
        // Data to update. We don't have to send everything, but only what we want to update
        req.body,
        {
            // Return the new updated contact
            new: true,
            // To not get any deprecation error messages in the request
            useFindAndModify: false
        }, (err, contact) => {
            if (err)
                res.send(err)
            res.json(contact);
        });
};

export const deleteContact = (req, res) => {
    Contact.deleteOne(
        // key
        { _id: req.params.contactId },
        (err, contact) => {
            if (err)
                res.send(err)
            res.json({ message: "Contact is successfully deleted"});
        });
};
