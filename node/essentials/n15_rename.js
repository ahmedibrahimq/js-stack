const fs = require("fs");

fs.renameSync("./assets/colors.json", "./assets/colorData.json");

fs.rename("./assets/notes.md", "./notes.md", err => {
    if (err) {
        throw err;
    }
});


setTimeout(() => {
    fs.unlinkSync("./assets/ul.png");

}, 4000);
