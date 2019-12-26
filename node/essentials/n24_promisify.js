const {promisify} = require("util");

const delay = (seconds, callback) => {
    if (seconds > 3) {
        callback(new Error(`${seconds} seconds are too long!`));
    } else {
        setTimeout(() => 
            callback(null, `The ${seconds} seconds delay is over`), seconds*1000);
    }
};

delay(4, (err, msg) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log(msg);
    }
});

const promiseDelay = promisify(delay);
promiseDelay(3)
    .then(console.log)
    .catch(err => console.log(err.message));
