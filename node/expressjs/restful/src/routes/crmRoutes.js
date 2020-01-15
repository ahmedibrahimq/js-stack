import {
    addNewContact,
    getContacts,
    getContactWithId,
    updateContact,
    deleteContact
} from "../conrollers/crmController";
import { register, login, loginRequired } from "../conrollers/userController";

const routes = app => {
    app.route('/contact')
        .get((req, res, next) => {
            //middelware
            console.log(`request from ${req.originalUrl}`);
            console.log(`request type ${req.method}`);
            next();
        }, loginRequired, getContacts)

        .post(loginRequired, addNewContact);

    app.route('/contact/:contactId')
        .get(loginRequired, getContactWithId)

        .put(loginRequired, updateContact)

        .delete(loginRequired, deleteContact);
    
    app.post('/auth/register', register);

    app.post('/auth/login', login);
};

export default routes;
