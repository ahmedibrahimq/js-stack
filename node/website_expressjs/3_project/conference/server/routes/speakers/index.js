const express = require("express");

const router = express.Router();

module.exports = () => {
    router.get("/", (req, res, next) => res.render("speakers",  {pgName: "Home"}));
    router.get("/:name", (req, res, next) => res.render("speakers/detail",  {pgName: req.params.name}));
    return router
};
