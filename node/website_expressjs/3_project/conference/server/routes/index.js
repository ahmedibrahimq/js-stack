const express = require("express");
const speakersRoute = require("./speakers");
const feedbackRoute = require("./feedback");

const router = express.Router();

module.exports = (args = {}) => {
    const { speakerService, feedbackService} = args;

    router.get("/", async (req, res, next) => {
        const [speakersList, artwork] = await Promise.all([speakerService.getNamesTitles(), speakerService.getAllArtwork()]);
        return res.render("index", { pgName: "Home", speakersList, artwork });
    });

    router.use("/speakers", speakersRoute({ speakerService }));
    router.use("/feedback", feedbackRoute({ feedbackService }));

    return router;
};
