/**
 * Duplex Stream is a stream that implements both a readable and a writable
 * 
 * duplex streams epresent the middle sections of a pipe line, (can be piped between a readable and a writable)
 *  that means that we can put them in between readables and writables.
 * 
 * duplex stream can receive data from a read stream and 
 *  then send that data to a write stream.
 * 
 * duplex streams help us compose streams into pipelines
 * 
 * PassThrough duplex stream
 *   - can be used if we wanted to say something about the data or report on it
 * 
 * We can extend Duplex to create our own duplex stream
 * 
 * When we implement a Duplex stream,
 *  we have to put a read and a write method because it has both.
 * 
 * Throttle
 *   transform stream that passes through chuncks per milliseconds
 *   - we can create another type of duplex stream called throttle
 *     to slow the whole pipline down. 
 * 
 *  _write
 *   invoke the callback() to signal that the write has been completed
 * 
 *   in order to actually have a delay here, set a timeout around this callback
 * 
 *  _final
 *   final means that we are getting no more data from the read stream, 
 *    so we also want to clear out the write stream by doing this.push(null)
 *    so that we can tell that the write stream has ended
 * 
 *  _read
 *   not going to do anything here, we don't want to make changes in the data
 *    We want to read the data as it comes into this throttle.
 * 
 */

const { createReadStream, createWriteStream } = require('fs');
const { Duplex, PassThrough } = require('stream');

const readStream = createReadStream('../../../zad-dinar.mp4');
const writeStream = createWriteStream('./zad-dinar-copy.mp4');

class Throttle extends Duplex {
    constructor(ms) {
        super();
        this.delay = ms;
    }

    _write(chunk, encoding, callback) {
        this.push(chunk);
        setTimeout(callback, this.delay);
    }

    _read() {}

    _final() {
        this.push(null);
    }
}

const reportBytes = new PassThrough();
const throttle = new Throttle(100);

let total = 0;
reportBytes.on('data', (chunk) => {
    total += chunk.length;
    console.log(`bytes: ${total}`);
});

readStream.pipe(throttle).pipe(reportBytes).pipe(writeStream);

