const {promisify, log} = require("util");
const fs = require("fs");

const beep = () => process.stdout.write("\x07");
const promiseWriteFile = promisify(fs.writeFile);
const promiseUnlink = promisify(fs.unlink);

const delayPromise = (seconds) => new Promise((resolves) => {
    setTimeout(resolves, seconds*1000);
});

const doSequentialStuff = () => Promise.resolve()
    .then(() => log("Starting "))
    .then(delayPromise(1))
    .then(() => "waiting")
    .then(log)
    .then(delayPromise(2))
    .then(promiseWriteFile("./assets/myFile", "This is a sample file.\nwritten by n25."))
    .then(() => "The file is successfully created")
    .then(log)
    .then(delayPromise(3))
    .then(promiseUnlink("./assets/myFile"))
    .then(() => "file successfully removed")
    .then(log)
    .catch(err => console.error(err));

doSequentialStuff();

console.log("end of the first tick")
