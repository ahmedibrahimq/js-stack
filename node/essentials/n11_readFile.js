const fs = require("fs");

const text = fs.readFileSync("README.md", "UTF-8");
console.log(text);

fs.readFile("README.md", "UTF-8", (err, text) => {
    if (err) {
        console.log(err.message);
        process.exit();
    }
    console.log(text);
});

fs.readFile("assets/ul.png", (err, bin) => {
    if (err) {
        console.log(err.message);
        process.exit();
    }
    console.log(bin);
});
