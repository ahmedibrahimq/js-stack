const {readFile} = require("fs");
const {promisify} = require("util");

const readFilePromise = promisify(readFile);

class SpeakerService {
    constructor(dataFile) {
        this.dataFile = dataFile;
    }

    async getNames() {
        // Returns only the names information
        const data = await this.getData();
        return data.map(speaker => { 
            return {name: speaker.name, nameURL: speaker.shortname};
        });
    }

    async getNamesTitles() {
        const data = await this.getData();
        return data.map(speaker => { 
            return {name: speaker.name, nameURL: speaker.shortname, title: speaker.title};
        });
    }

    async getNamesTitlesSummary() {
        const data = await this.getData();
        return data.map(speaker => { 
            return {name: speaker.name, nameURL: speaker.shortname, title: speaker.title, summary: speaker.summary};
        });
    }

    async getAllArtwork() {
        const data = await this.getData();
        
        const initValue = [];
        const artwork = data.reduce((acc, speakerElement) => {
            if (speakerElement.artwork) {
                acc = [...acc, ...speakerElement.artwork]
            }
            return acc;
        }, initValue);
        return artwork;
    }

    async getSpeakerByShortname(shortname) {
        const data = await this.getData();
        const speaker = data.find(speaker => speaker.shortname === shortname);
        return speaker ? speaker : null;
    }

    async getData() {
        const data = await readFilePromise(this.dataFile, "UTF-8");
        if(!data) return [];
        return JSON.parse(data).speakers;
    }
}

module.exports = SpeakerService;
