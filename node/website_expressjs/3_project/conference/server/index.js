const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.static("public")); // a static middleware this path is relative to the application root folder
app.get("/favicon.ico", (req, res, next) => res.sendStatus(204)); // empty responce:(No Content) Nothing to see here
app.use("/", routes()); // a routing middleware that reacts to the '/' regardless of the request verb(get,post ...)

app.listen(3000);

module.exports = app;
