import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import jwt from 'jsonwebtoken';

const app = express();
const PORT = 4000;
const DISTNODE = 'mongodb://localhost/CRMdb';

// Mongoose connection
mongoose.Promise = global.Promise; // wait for results
mongoose.connect(DISTNODE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// body parser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT setup
app.use((req, res, next) => {
    if (req.headers, req.headers.authorization) {
        const [isJWT, token] = req.headers.authorization.split(' ');
        if (isJWT === 'JWT') {
            jwt.verify(token, 'Very Secret', (err, decode) => {
                if (err)
                    req.user = undefined;
                else
                    req.user = decode;
                next();
            });
        } else {
            req.user = undefined;
            next();
        }
    } else {
        req.user = undefined;
        next();
    }
});

routes(app);

app.get('/', (req, res) =>
    res.send(`GET from ${req.originalUrl}`)
);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
