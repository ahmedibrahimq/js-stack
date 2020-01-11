import express from 'express';
import data from './data/data.json';

const app = express();
const PORT = 3000;

//Routes

//* Adding a static path to the server
//- Static route for file serving. (a middleware)
//- Default route is `/`
app.use('/my-data', express.static('data'));

//* Sending json data
//* Passing multiple request parameters in a single path
app.get('/user/:id/:property', (req, res) => {
    const id = Number(req.params.id);
    const user = data[id];
    const key = req.params.property;
    const { [key]: value } = user;

    //res.json(user);
    res.json({ [key]: value });
});

/**
 * next() -> do multiple callbacks
 * Handling multiple functoins/handlers, **within a single route call**
 * next() could be done multiple times within the same call.
 * This allows to create a middleware to do anything before or after. 
 * *** NOTICE ***
 * YOU CAN ONLY DO ONE response method for a single call
 * You can only respond once to the client within a single get, or put, or post in this path
 */
app.get('/next', (req, res, next) => {
    res.send('One');
    next();
}, (req, res) =>
    console.log('Two')
);

/**
 * response.end() -> end the call on its tracks, so basically end it right away.
 * That is very limited in use, because most of the time, we don't want to end a call to our API.
 * But this could be useful in certain cases.
 */
app.get('/end', (req, res) =>
res.end()
);

// Redirect to another OriginalURL
app.get('/redirect', (req, res) =>
res.redirect('https://www.linkedin.com/learning/')
);

/**
 * response.download()
 * This is very similar to sendFile(). It's newer than sendFile,
 * but it's, basically, more explicit
 */
app.get('/download', (req, res) =>
    res.download('./data/data.json')
);

/**
 * Chaining => to refactor the code to make it cleaner
 * chaining multiple METHODS into a single block of code for a specific path
 */
app.route('/item')
    .get((req, res) => 
        res.send(`a ${req.method} request with ${req.originalUrl} route.`)
    )
    .post((req, res) => 
        res.send(`a ${req.method} request with ${req.originalUrl} route.`)
    )
    .put((req, res) => 
        res.send(`a ${req.method} request with ${req.originalUrl} route.`)
    )
    .delete((req, res) => 
        res.send(`a ${req.method} request with ${req.originalUrl} route.`)
    );

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});
