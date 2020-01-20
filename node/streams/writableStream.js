const { createReadStream, createWriteStream } = require('fs');

// Writeable streams can be used to capture the data from a readable source
// Copying a video with write and reade streams
const writeStream = createWriteStream('./zad-dinar-copy.mp4');
const readStream = createReadStream('../../../zad-dinar.mp4');


// readStream handlers
readStream.on('data', (chunk) => {
    // write streams are designed to write bits of data one chunk at a time
    writeStream.write(chunk);
});

// when read stream is over, let write stream know that no more data is coming
readStream.on('end', (chunk) => {
    writeStream.end();
});

readStream.on('error', console.error);

// writeStream handlers
writeStream.on('close', () => console.log('file copied!'));
