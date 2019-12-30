const {join} = require("path");
const express = require("express");
const httpErrors = require("http-errors")
const configs = require("./configs");
const routes = require("./routes");

const app = express();
const config = configs[app.get('env')];
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

// Routes

// The main route
app.use("/", routes()); // a routing middleware that reacts to the '/' regardless of the request verb(get,post ...)

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
