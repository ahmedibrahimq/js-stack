const express = require("express");
const speakersRoute = require("./speakers");
const feedbackRoute = require("./feedback");

const router = express.Router();

module.exports = () => {
    router.get("/", (req, res, next) => res.render("index"));
    router.use("/speakers", speakersRoute());
    router.use("/feedback", feedbackRoute());
    return router;
};
