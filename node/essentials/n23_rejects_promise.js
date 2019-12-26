const delay = seconds => new Promise((resolves, rejects) => {
    if (seconds > 3) {
        rejects(new Error(`${seconds} are too much`));
    }

    setTimeout(resolves, seconds*1000);
});

const promise = delay(12);
promise.then(() => console.log("Hello world"))
    .catch(err => {
        console.log(err.message);
        process.exit();
    });

console.log("End first tick");
