function hideString(str, done) {
    process.nextTick(() => {
        done(str.replace(/[a-zA-Z]/g, "X"));
    });
}

hideString("Hello, World!", hiddenStr => console.log(hiddenStr));
console.log("End");
