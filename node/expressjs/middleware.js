import express from 'express';
import favicon from 'serve-favicon';
import { join } from "path";

// Middleware is basically functions that are happening before we actually are sending the response back
/**
 * router-level middleware, versus application 
 * very much the same.
 * The only difference that routing level middleware is wrapped inside express.Router,
 *  and the only reason you would use one over another
 *  is if you want to clear up code from the application middleware,
 *  and do it in a routing level for modularity reasons.
 * So no differences between the two. 
 */

// Built-in middleware

//Static files
app.use('/data', express.static('data'));

// Third-party middleware 
// serve-favicon middleware => add a little icon to the application
app.use(favicon(join(__dirname, 'public', 'favicon.ico')));

// Built-in middlewares

/**
 * Warse JSON POST commands
 * When a form or the front end wants to send new data to the server and database
 * It's Express' own version of body-parser
 */
app.use(express.json());

/**JSON data versus URLEncoded
 * { "x": "y z" }
 * x=y+z
*/
app.use(express.urlencoded({ extended: true }));

app.post('/json-and-urlencoded', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(`Error: ${err.stack}`);
});


