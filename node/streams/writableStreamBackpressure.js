/**
 * Sometimes the data coming from a readable stream 
 *  is too fast for a writable stream to handle
 * Whenever we actually have a full hose, this is referred to as `Backpressure`, 
 * and how much data our hose can handle is referred to as the `highWaterMark
 * 
 */
const { createReadStream, createWriteStream } = require('fs');


// we are abe to decide how thick the writeStream hose is,
// by setting the highWaterMark
const writeStream = createWriteStream('./zad-dinar-copy.mp4', {
    // The larger hose, the less backpressure
    highWaterMark: 168920, // can be any number!
});
const readStream = createReadStream('../../../zad-dinar.mp4');
/*
* Every time there was backpressure instead of creating more memory e.g. (setting a large highWaterMark)
* now we pause the read stream until the write steam can handle that much data
*/
// writeStream.write will let us know whether the hose is full or not. 
// It will return a true or false value as to whether it can handle more data or not
readStream.on('data', (chunk) => {
    const canHandlemore = writeStream.write(chunk);
    // If the hose is full, stop pouring data
    if (!canHandlemore) {
        console.log('backpressure!');
        readStream.pause();
    }
});

readStream.on('end', (chunk) => {
    writeStream.end();
});

readStream.on('error', console.error);

// how do we know when to start pouring data in again
writeStream.on('drain', () => {
    console.log('drained');
    readStream.resume();
});

writeStream.on('close', () => console.log('File copied!'));

/** REAPLACING ALL THE ABOVE CODE WITH A SINGLE LINE!
 * 
 * We can pipe a read stream to a write stream, 
 * simply by typing readStream.pipe(writeStream)
 * 
 * Instead of wiring up a bunch of listeners to listen for chunks of data 
 * and then pass those chunks of data into the write stream, 
 * the pipe method is doing it for us.
 * 
 * The pipe method also automatically handles back pressure.
 * 
 * The only thing that is not handled is an error listener, 
 * 
 */
readStream.pipe(writeStream).on('error', console.error);
