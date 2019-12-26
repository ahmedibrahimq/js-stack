const questions = [
    "What is your name?",
    "What are you doing?",
    "What is the programming language you prefere?"
];

const ask = (i=0) => {
    process.stdout.write(`\n\n\n ${questions[i]}`);
    process.stdout.write(" > ");
}
ask();

const answers = [];
process.stdin.on("data", data => {
    answers.push(data.toString().trim());
    if (answers.length < questions.length) {
        ask(answers.length);
    } else {
        process.exit();
    }
});

process.on("exit", () => {
    const [name, doing, lang] = answers;
    console.log(`

Thank you for your answers.

Go ${doing} ${name} and write ${lang} later.
    `);
});
