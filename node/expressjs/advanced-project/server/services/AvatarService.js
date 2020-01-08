const { resolve } = require('path');
const { unlink } = require('fs');
const { promisify } = require('util');
const sharp = require("sharp")
const uuidv4 = require('uuid/v4');

const unlinkPromise = promisify(unlink);

class AvatarService {
    constructor(storeDirectory) {
        this.storeDirectory = storeDirectory
    }
    
    async store(buffer) {
        const fileName = AvatarService.uniqueFilename();
        const filePath = this.filepath(fileName);
        
        // shrink the image to a maximum size needed on our page to save disk space.
        // convert the image to PNG, to not having to deal with different file formats
        await sharp(buffer)
        .resize(300, 300, {
            // fit.inside:  Preserving aspect ratio,
            // resize the image to be as large as possible while
            // ensuring its dimensions are less than or equal to both those specified.
            fit: sharp.fit.inside,
            // Do not enlarge if the width or height are already less than the specified dimensions
            // enlarging causes loss of image quality
            withoutEnlargement: true,
        })
        .toFile(filePath);
        return fileName;
    }
    
    async delete(filename) {
        await unlinkPromise(this.filepath(filename))
    }
    
    static uniqueFilename() { return `${uuidv4()}.png` }
    
    filepath(filename) { return resolve(`${this.storeDirectory}/${filename}`) }


}

module.exports = AvatarService;