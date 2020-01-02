const express = require("express");

const router = express.Router();

module.exports = (args = {}) => {
    const { feedbackService } = args;

    router.get("/", async (req, res, next) => {
        try {
            const feedbacks = await feedbackService.getData();
            return res.render("feedback", {
                pgName: "Feedback",
                feedbacks,
                success: req.query.success, // If form is successfuly submitted
            });
        } catch (err) {
            return next(err);
        }
    });

    router.post("/", async (req, res, next) => {
        const feedbacks = await feedbackService.getData();
        const fdbName = req.body.fdbName.trim()
        const fdbTitle = req.body.fdbTitle.trim()
        const fdbMsg = req.body.fdbMsg.trim()

        // Validate form data
        if (!fdbName || !fdbTitle || !fdbMsg) {
            return res.render("feedback", {
                pgName: "Feedback",
                err: true,
                feedbacks,
                //to keep the filled data
                fdbName,
                fdbTitle,
                fdbMsg,
            });
        }
        await feedbackService.addData(fdbName, fdbTitle, fdbMsg); // Store new feedback entry

        return res.redirect("feedback?success=true"); // If form is valid
    });

    return router;
};
