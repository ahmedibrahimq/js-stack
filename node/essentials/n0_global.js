const path = require("path");

global.console.log(__dirname);
global.console.log(__filename);
console.log(`File name is ${path.basename(__filename)}`);
