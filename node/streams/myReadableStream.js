/**
 * Readable stream reads data from a source and then feeds it into a pipeline bit by bit
 * 
 * 
 */
const { Readable } = require('stream');

const anArray = [
    "This",
    "is",
    "an",
    "array",
    "!"
];

/**
 * streams have two modes, binary mode and object mode (objectMode: true)
 * in binary mode, we can read data as binary 
 *  or as a string (by setting encoding: 'UTF-8')
 * in object mode, streams can pass any type of JavaScript objects
 */
class StreamFromArray extends Readable {
    constructor(array) {
        // invoke super, invokes the readable stream, to set up our stream object
        super({ objectMode: true });
        // super({ encoding: 'UTF-8' }); // binary mode
        this.array = array;
        this.index = 0;
    }


    // because we extend the readable stream, we need to implement read function
    // the read function is what happens when the stream reads a chunk of data
    _read() {
        if (this.index < this.array.length) {
            // const chunk = this.array[this.index]; // for binary mode
            const chunk = { buffer: this.array[this.index], index: this.index };
            // push chunks of data into the stream
            this.push(chunk);
            this.index += 1;
        } else {
            // signal to the Readable that the stream is over
            this.push(null);
        }
    }
}

const arrayStream = new StreamFromArray(anArray);

// Whenever a data event is raised, 
// a little bit of data (chunk) is passed to the callback function
arrayStream.on('data', (chunk) => console.log(chunk));

arrayStream.on('end', () => console.log('Done!'));
