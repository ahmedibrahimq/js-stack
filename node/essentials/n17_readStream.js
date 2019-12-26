const fs = require("fs");

const readStream = fs.createReadStream("./assets/huge.md", "UTF-8");
let fileTxt = "";

readStream.on("data", data => {
    console.log(`Read ${data.length - 1} characters`);
    fileTxt += data;
});

readStream.once("data", data => {
    console.log("The first chunck of data:");
    console.log(data);
});

readStream.on("end", () => {
    console.log("Finished reading file.")
    console.log(`Read in total ${fileTxt.length - 1} characters`);
});
