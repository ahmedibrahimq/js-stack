const express = require("express");

const router = express.Router();

module.exports = () => {
    router.get("/", (req, res, next) => res.render("speakers"));
    router.get("/:name", (req, res, next) => res.render("speakers/detail"));
    return router
};
