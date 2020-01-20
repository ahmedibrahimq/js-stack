const { createReadStream } = require('fs');

/**
 * Our readStream is in flowing mode, 
 *  it automatically pushes each chunk of data into the pipeline
 * We can switch between flowing and non-flowing modes by invoking pause() and resume()
 * In Non-flowing streams, e.g.(stdin), we have to ask for the data
 */
const readStream = createReadStream('../../../zad-dinar.mp4');

readStream.on('data', (chunk) => console.log('read a chunk of size: ', chunk.length));

readStream.on('end', (chunk) => {
    console.log(`read stream finished`)
    process.exit();
});

readStream.on('error', console.error);

// by invoking pause, set readStream as a non-flowing mode stream.
readStream.pause();

// stdn stream is in non-flowing mode
process.stdin.on('data', (chunk) => {
    if (chunk.toString().trim() === 'flow') {
        // returning readStream back as a non-flowing mode stream
        readStream.resume();
    }
    else {
        // Ask for the next chunk, when readStream is non-flowing
        readStream.read();
    }
});
