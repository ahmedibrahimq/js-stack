const collectAnswers = require("./lib/n7_collectAnswers");

const questions = [
    "What is your name? ",
    "Where do you live? ",
    "What do you do? "
];

collectAnswers(questions, answers => {
    console.log("Thank you for your answers.");
    console.log(answers);
    process.exit();
});
