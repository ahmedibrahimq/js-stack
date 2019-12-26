const fs = require("fs");
const {join} = require("path");

fs.renameSync("./storage-data", "./storage");
fs.readdirSync("./storage").forEach(fileName => {
    fs.unlinkSync(join(__dirname, "storage", fileName));
});

fs.rmdir("./storage", err => {
    if (err) {
        throw err;
    }
    console.log("Directory removed");
});
