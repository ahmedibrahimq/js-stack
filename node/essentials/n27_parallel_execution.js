const fs = require("fs");
const {promisify, log} = require("util");
const {join} = require("path");

const writeFilePromise = promisify(fs.writeFile);
const readdirPromise = promisify(fs.readdir);
const unlinkPromise = promisify(fs.unlink);

const delayPromise = (seconds) => new Promise((resolves) => {
    setTimeout(() => resolves(`${seconds}s delay finisted.`), seconds*1000);
});

Promise.all([
    delayPromise(1),
    writeFilePromise("./assets/myfile.a", "written by n27"),
    delayPromise(3),
    writeFilePromise("./assets/myfile.b", "written by n27"),
    delayPromise(5),
    writeFilePromise("./assets/myfile.c", "written by n27"),
]).then(() =>readdirPromise(join(__dirname, "assets")))
.then(log);


Promise.all([
    delayPromise(5).then(log),
    delayPromise(1).then(log),
    delayPromise(2).then(log),
    delayPromise(4).then(log),
    delayPromise(9).then(log),
]).then(() => log("This resolved after all promises are resolved"));
    
Promise.race([
    delayPromise(5),
    delayPromise(2),
    delayPromise(3),
    delayPromise(7),
]).then(() => log("This resolved after the first promise is resolved"));
