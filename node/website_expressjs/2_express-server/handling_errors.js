const express = require("express");

const app = express();

console.log(app.get('env'));
// export NODE_ENV=<development, testing, production>

app.get("/throw", (req, res, next) => {
    throw new Error("Throwed error: Bad Practice");
});

app.get("/next", (req, res, next) => {
    next(new Error("Error in next"));
});

app.get("/async-throw", (req, res, next) => {
    setTimeout(() => {
        throw new Error("Throwed error: Bad Practice, breaks down the server");
    }, 3000);
});

app.get("/async-next", (req, res, next) => {
    setTimeout(() => {
        next(new Error("Error in next"));
    }, 3000);
});

app.listen(3000);
