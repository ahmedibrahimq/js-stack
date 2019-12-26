const fs = require("fs");

const md = `
# This is a new file

* fs.readDir
* fs.readFile
* fs.writeFile

`;

fs.writeFile("./assets/notes.md", md.trim(), err => {
    if (err) {
        throw err;
    }
    console.log("File Saved");
});
