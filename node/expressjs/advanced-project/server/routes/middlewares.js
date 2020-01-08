/**
 * multer for  multipart/form-data encoding
 * IMPORTANT: Limit the file size.
 * Configure multer to store the file on disk
 *   and the default is storing it in memory. 
 */
const multer = require('multer');

const upload = multer({
    // Allowing unlimited file sizes could be used to create a denial-of-service attack.
    limits: 2 * 1024 * 1024, // 2 MB
});

module.exports.upload = upload;
