const cp = require("child_process");

const questionsApp = cp.spawn("node", ["n6_questions.js"]);

questionsApp.stdin.write("Ahmed\n");
questionsApp.stdin.write("Egypt\n");
questionsApp.stdin.write("Doing!\n");

questionsApp.stdout.on("data", data => {
    console.log(`From questions app: ${data}`);
});

questionsApp.on("error", err => console.log(err));

questionsApp.on("close", () => {
    console.log("QuestionsApp process exited");
});
