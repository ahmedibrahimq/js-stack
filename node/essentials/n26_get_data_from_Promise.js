const {readdir} = require("fs");
const {promisify} = require("util");

const readdirPromise = promisify(readdir);

const getfiles = async () => {
    const files = await readdirPromise(__dirname);
    console.log(files);
}

getfiles();
