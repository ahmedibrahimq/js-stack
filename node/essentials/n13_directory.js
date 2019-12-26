const fs = require("fs");

if (fs.existsSync("n13-dir")) {
    console.log("Already exists")
} else {
    fs.mkdir("n13-dir", err => {
        if (err) {
            throw err;
        }
        console.log("Directory created");
    });
}fs.mkdir("n13-dir", err => {
    if (err) {
        throw err;
    }
    console.log("Directory created");
});
