const express = require("express");

const router = express.Router();

module.exports = () => {
    router.get("/", (req, res, next) => res.render("Feedback",  {pgName: "Feedback"}));
    router.post("/", (req, res, next) => res.send("Form sent!"));
    return router;
};
