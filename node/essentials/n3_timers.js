const waitTime = 5000;
const waitInterval = 500;
let currentTime = 0;

const incTime = () => {
    currentTime += waitInterval;
    const persent = Math.floor(currentTime/waitTime * 100);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`waiting ... ${persent}%`);
};

console.log(`Setting a ${waitTime/1000} second delay`);
const timerFinished = () => {
    clearInterval(interval);
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    console.log("Done");
};
const interval = setInterval(incTime, waitInterval);
setTimeout(timerFinished, waitTime);

