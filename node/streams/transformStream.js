/**
 * Transform streams are a special type of duplex stream.
 *  instead of simply passing the data to the read in to the write in, 
 * transform streams change the data
 * 
 * transform streams used to transform data from readable streams before they are sent to writable streams
 *
 *  _transform
 *   transform streams have different methods, instead of _write we are going to use _transform 
 *     it looks similar to the _write
 *  _flush
 *   flush method will get a callback. So once our read stream has stopped, we can still push more into transform stream
 *   
 * node.js has more
 * node.js comes with a zlib package, that's a transform stream that can be 
 *   used to zip incoming data from the read stream, and send compressed data to the write stream.
 * 
 * Crypto is an NPM package that has transform streams that can 
 *   encrypt data chunk by chunk, and then pass encrypted data to the write stream, 
 *   or decrypt data from a read stream, and pass the decrypted data to the write stream
*/

const { Transform } = require('stream')

class MaskText extends Transform {
    constructor(char) {
        super();
        this.charMask = char;
    }

    _transform(chunk, encoding, callback) {
        const transformedChunk = chunk.toString()
        .replace(/[a-z]|[A-Z]|[0-9]/g, this.charMask);
        this.push(transformedChunk);
        callback();
    }

    _flush(callback) {
        this.push('We can pass more here! ...');
        callback();
    }
}

const xTransform = new MaskText('X');
process.stdin
    .pipe(xTransform)
    .pipe(process.stdout);
