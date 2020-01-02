const express = require("express");

const router = express.Router();

module.exports = (args = {}) => {
    const { speakerService } = args;

    router.get("/", async (req, res, next) => {
        try {
            const promises = [];
            promises.push(speakerService.getNamesTitlesSummary());
            promises.push(speakerService.getAllArtwork());
            [speakersListwithSummary, artwork] = await Promise.all(promises);

            return res.render("speakers", {
                pgName: "Speakers",
                speakersListwithSummary,
                artwork,
            });
        } catch (err) { next(err); }

    });

    router.get("/:name", async (req, res, next) => {
        try {
            const speaker = await speakerService.getSpeakerByShortname(req.params.name);
            if(!speaker) {
                return next();
            }
            return res.render("speakers/detail", { pgName: req.params.name,  speaker, artwork: speaker.artwork})
        } catch (err) { next(err); }
    });
    return router
};
