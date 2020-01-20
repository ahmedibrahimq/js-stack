/**
 * Streaming to the browser

 because the response is a stream, we can simply pipe our read stream to the response

We should tell the web browser how long the video is, and we can do that through the headers

We can get information about how big our video file is using the {stat} function from fs module.
 But the stat function uses callback handlers. So we can convert the stat function to a promise


 await >>>>> And what this will do is it will actually calls the code to wait.
  We can use it if we won't execute lines below until this promise has been resolved

Range requests
 Now we're displaying this using the HTML 5 video component.
  The browser knows to use that because any requests to local host 3000 returns an MP4 video.
   But the problem is, if we request another time on this play head, a future point in this video, it doesn't handle that.
    So these are called range requests. And what we need to do is make our video respond to range requests.
     This is very important because if we use Safari, we don't see a video at all.
      And the reason is that Safari requires that we handle these range requests.


# Handling range requests

our streams only work in Firefox and Chrome. They don't work in Safari and we can't skip ahead.
 We cannot request the different range. 
           we have to implement range requests.

These range requests are actually handled via the headers.
 So req.headers.range

NOTE The first range request is undefined. 
That undefined request is the request that the browser makes for the favicon that has nothing to do with the video,
 so, it doesn't have a range header.
 
pasring: the range header is a string and it says bytes equal from the start position to the end position,
 and both of these positions are separated with a hyphen.


the end value isn't necessarily always gonna be present because as we make range requests,
 we're actually making a request from a starting position through the rest of the video, so it might not always be there.

So the end value may be the end of the entire video

write our response header to respond to the range request. So we'll do res.writeHead.

Status 206
: 206 means partial content. So we're gonna be streaming a part of the video, not a full video, 
   --> Content-Range =>> (start value - end value / size value)
  |
 |So we're telling the browser in this header what the bytes are that we're gonna start with, what we're gonna end with,
  and the size, the current full size of the video

 Accept-Range header.
  =>> we wanna know that we're working with bytes, so we're gonna accept ranges as bytes.
 
 Content-Length.
  =>> it is the end value minus the start value and plus one

create a ReadStream that only streams part of the file
we're not gonna create a stream for the full video. We're gonna send some additional options.
 So in the second argument (options) we will include start and end values.


Stream content from the browser:

# Forking and uploading streams

The HTTP response object is a writable stream and the HTTP request object is a readable stream.
 We can use the request stream as a source

//////////////////// our server's gonna handle multiple requests so we're only handling one video request here in range request

we can fork our streams. we can request.pipe to many places

multipart form data
 our response streams the file that we uploaded, so the contents of whatever the file is, a text file or a binary file,

# Parsing multi-part form data

multiparty => multipart/form-data parser that is also supports streams.
 - it will give us any files that are inside that upload request as parts. 
 - it will also give us any normal form data

We only have one value in our form and that's the upload file,
 so we're gonna validate that by listening for a part event.
   when multiparty find a file or a form field, that's going to be sent as a part.
    So we can handle that within a callback function.
    
The neat thing about multiparty is a part is a readable stream.
    So when we find a part, we will upload it by
    taking the part and pipe it to a create write stream.
 */
const { stat, createReadStream, createWriteStream } = require('fs');
const { createServer } = require('http');
const { promisify } = require('util');
const multiparty = require('multiparty');

const statPromise = promisify(stat);
const PORT = 3000;
const FILE_PATH = '../../../../zad-dinar.mp4'

const formHTML = `
<form enctype="multipart/form-data" method="POST" action="/">
  <input type="file" name="upload-file" />
  <button>Upload File</button>
</form>
`

const parseRangeHeader = (range) => {
  [start, end] = range.replace(/bytes=/, '').split('-');
  start = parseInt(start, 10);
  end = end ? parseInt(end, 10) : undefined;
  return [start, end];
};

const streamHandler = async (req, res) => {
  const { size } = await statPromise(FILE_PATH);
  const range = req.headers.range;

  if (range) {
    [start, end = size - 1] = parseRangeHeader(range);

    res.writeHead(206, {
      'Accept-Ranges': 'bytes',
      'content-Range': `bytes ${start}-${end}/${size}`,
      'Content-Length': (end - start) + 1,
      'Content-Type': 'video/mp4',
    });
    createReadStream(FILE_PATH, { start, end })
      .pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': size,
      'Content-Type': 'video/mp4',
    });
    createReadStream(FILE_PATH).pipe(res);
  }
};

const formPOSTHandler = (req, res) => {
  let form = new multiparty.Form();

  form.on('part', (part) => {
    const filename = part.filename;
    if (filename) {
      part.pipe(createWriteStream(`./uploads/${filename}`))
        .on('close', () => {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(`File uploaded: ${filename}`);
        });
    }
  });

  form.parse(req);
};

createServer((req, res) => {
  if (req.url === '/stream') {
    streamHandler(req, res);
  } else if (req.method === 'POST') {
    formPOSTHandler(req, res);
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(formHTML);
  }

})
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
