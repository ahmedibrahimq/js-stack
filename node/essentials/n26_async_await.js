const {writeFile, unlink} = require("fs");
const {promisify, log} = require("util");

const writeFilePromise = promisify(writeFile);
const unlinkPromise = promisify(unlink);

const delayPromise = (seconds) => new Promise((resolves) => {
    setTimeout(resolves, seconds*1000);
});

const doSequentially = async () => {
    log("Starting");
    await delayPromise(1);
    log("waiting ...");
    await delayPromise(2);
    await writeFilePromise("./assets/myfile.md", "Written by n26");
    log("File successfully written");
    await delayPromise(3);
    try {
        await unlinkPromise("./assets/mdyfile.md");
        log("file successfully removed");
    } catch (error) {
        console.error(error);
    }

    return Promise.resolve();
}

doSequentially().then(() => log("Ending"));

console.log("End of the first Tick")
