const fs = require("fs");
const {log} = require("util");

log("Start reading files synchronously...");
const files = fs.readdirSync(".");
log("complete");
log(files);
console.log("\n\n\n");
fs.readdir(".", (err, files) => {
    if(err) {
        throw err;
    }
    log("complete");
    log(files);
});

log("Reading files asynchronously ...");
