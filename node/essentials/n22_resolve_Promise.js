const delay = seconds => new Promise((resolves, rejects) => {
    //setTimeout(resolves, seconds*1000);
    const msg = "The delay has ended";
    setTimeout(() => resolves(msg), seconds*1000);
});

const promise = delay(1);
promise.then(console.log)
    .then(() => 2)
    .then((number) => console.log(`Hello world: ${2}`));

console.log("End first tick");
