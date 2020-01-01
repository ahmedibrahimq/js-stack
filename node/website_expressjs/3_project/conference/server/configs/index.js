const {join} = require("path");

module.exports = {
    development: {
        sitename: "R Meetups [Development]",
        data: {
            speakers: join(__dirname, "../data/speakers.json"),
            feedback: join(__dirname, "../data/feedback.json"),
        },
    },

    testing: {
        sitename: "R Meetups [Testing]",
        data: {
            speakers: join(__dirname, "../data/speakers.json"),
            feedback: join(__dirname, "../data/feedback.json"),
        },
    },

    production: {
        sitename: "R Meetups",
        data: {
            speakers:[],
            feedback: [],
        }
    }
}