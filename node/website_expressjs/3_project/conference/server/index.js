const { join } = require("path");
const express = require("express");
const httpErrors = require("http-errors");
const bodyParser = require("body-parser");
const configs = require("./configs");
const SpeakerService = require("./services/SpeakerService");
const FeedbackService = require("./services/FeedbackService");
const routes = require("./routes");

const app = express();
const config = configs[app.get('env')];
const speakerService = new SpeakerService(config.data.speakers); // Provide speakers data
const feedbackService = new FeedbackService(config.data.feedback); // Provide feedback data

app.locals.title = config.sitename; // a global template variable

// Setting views configs
app.set("view engine", "pug");
app.set("views", join(__dirname, "./views"));
if (app.get('env') === 'development') {
    app.locals.pretty = true; // Do not optimize rendered files
}

// Middlewares

// a static middleware
//This path is relative to the application root folder
app.use(express.static("public"));
app.get("/favicon.ico", (req, res, next) => res.sendStatus(204)); // empty responce:(No Content) Nothing to see here

/* A middleware that parses form data in the raw HTTP body data if found, and store it into request body.
 * Adding before the route start and after the static middleware.
 * `bodyParser.urlencoded` to format the form it sent with 
 * `extended` option tells the parser to also parse more complex data structures.
 */
app.use(bodyParser.urlencoded({ extended: true }));

// a middleware for setting global variables that is evaluated per request, and globally available to all templates
// Put it somewhere before the routes are defined,
// and also after the express static middleware is called
// because we don't want to run this for each static file e.g., css, img, ...
app.use(async (req, res, next) => {
    res.locals.renderTime = new Date();

    try {
        res.locals.speakersForHeader = await speakerService.getNames();
    } catch (err) {
        return next(err);
    }

    return next();
});


// Routes

// The main route
app.use("/", routes({ speakerService, feedbackService })); // a routing middleware that reacts to the '/' regardless of the request verb(get,post ...)

//Handling 404 Unknown routes
// This matches if no other route matches. This handler comes after all routes are processed, to be sure that no other route matched
app.use((req, res, next) => {
    return next(httpErrors(404, "Page not found"));
});

// Errors handler (middleware)
app.use((err, req, res, next) => {
    const errStatus = err.status || 500; // 500 to cover the case when there is a server error that we don't know about

    // Store error info as properties in the response locals
    res.locals.msg = err.message;
    res.locals.status = errStatus;
    res.locals.err = req.app.get("env") === "development" ? err : {}; // Show the stack of error

    res.status(errStatus); // set the response status
    return res.render("error");
});

app.listen(3000);

module.exports = app;
