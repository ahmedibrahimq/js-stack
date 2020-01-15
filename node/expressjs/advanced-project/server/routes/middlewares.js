/**
 * multer for  multipart/form-data encoding
 * IMPORTANT: Limit the file size.
 * Configure multer to store the file on disk
 *   and the default is storing it in memory. 
 */
const multer = require('multer');

const upload = multer({
    // Allowing unlimited file sizes could be used to create a denial-of-service attack.
    limits: {
        fileSize: 2 * 1024 * 1024, // 2 MB
    } 
});

module.exports.upload = upload;

module.exports.handleAvatars = avatars => async (req, res, next) => {
    if (!req.file) {
        return next()
    }
    if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg') {
        return next(new Error('File format is not supported'))
    }

    // a valid image
    /**
     * A very common pattern to use:
     * If you pass information down to other middlewares, 
     *  just add it to the request object.
     */
    req.file.storedFilename = await avatars.store(req.file.buffer);
    return next();
};
