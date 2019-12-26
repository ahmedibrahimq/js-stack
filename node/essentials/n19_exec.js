const cp = require("child_process");

// cp.exec("xdg-open https://www.linkedin.com/learning");

/* cp.exec("ls", (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
}); */

/* cp.exec("lst", (err) => {
    if (err) {
        throw err;
    }
}); */

cp.exec("lst", (err, data, stderr) => {
    console.log(stderr);
});
