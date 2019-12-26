const {promisify} = require("util");
const fs = require("fs");

const writefilePromise = promisify(fs.writeFile);
writefilePromise("./assets/myFile","This is a sample text ...")
    .then(() => console.log("File successfully written"))
    .catch(err => console.log(`Error creating file: ${err.message}`));
