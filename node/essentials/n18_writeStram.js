const fs = require("fs");

const writeStream = fs.createWriteStream("./assets/myFile", "UTF-8");
const readStream = fs.createReadStream("./assets/huge.md", "UTF-8");

writeStream.write("Hello ");
writeStream.write("world\n");

// readStream.pipe(writeStream);

// process.stdin.on("data", data => {
//     writeStream.write(data);
// });

process.stdin.pipe(writeStream);


