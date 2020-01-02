const { readFile, writeFile } = require("fs");
const { promisify } = require("util");

const readFilePromise = promisify(readFile);
const writeFilePromise = promisify(writeFile);

class FeedbackService {
    constructor(dataFile) {
        this.dataFile = dataFile;
    }

    async getData() {
        const data = await readFilePromise(this.dataFile, "UTF-8");
        if (!data) {
            return [];
        }
        return JSON.parse(data);
    }

    async addData(name, title, message) {
        let data = await readFilePromise(this.dataFile, "UTF-8");
        data = JSON.parse(data);
        data.unshift({name, title, message});
        await writeFilePromise(this.dataFile, JSON.stringify(data), "UTF-8");
    }
}

module.exports = FeedbackService;
