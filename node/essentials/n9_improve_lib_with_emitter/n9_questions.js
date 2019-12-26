const collectAnswers = require("./lib/n9_collectAnswers");

const questions = [
    "What is your name? ",
    "Where do you live? ",
    "What do you do? "
];

const answerEvents = collectAnswers(questions);

answerEvents.on("answer", answer => {
    console.log(`Question answered: ${answer}`);
});

answerEvents.on("complete", answers => {
    console.log("Thank you for your answers.");
    console.log(answers);
})

answerEvents.on("complete", () => process.exit());
