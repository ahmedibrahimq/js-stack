const readline = require("readline");
const {log} = require("util");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("How are you? ", answer => {
    log(`Your anwser: ${answer}`);
})
