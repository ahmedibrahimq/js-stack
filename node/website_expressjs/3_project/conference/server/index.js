const express = require("express");
const routes = require("./routes");

const app = express();

// Setting views configs
app.set("view engine", "pug");
app.set("views", join(__dirname, "./views"));
if (app.get('env' === 'development')) {
    app.locals.pretty = true; // Do not optimize rendered files
}

// Static files
app.use(express.static("public")); // a static middleware this path is relative to the application root folder
app.get("/favicon.ico", (req, res, next) => res.sendStatus(204)); // empty responce:(No Content) Nothing to see here

// The main route
app.use("/", routes()); // a routing middleware that reacts to the '/' regardless of the request verb(get,post ...)

app.listen(3000);

module.exports = app;
