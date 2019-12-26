const {log} = require("util");

const delay = (seconds) => new Promise((resolves) => {
    setTimeout(() => resolves(`${seconds}s delay ends`), seconds*1000);
});

const tasks = [
    delay(1),
    delay(9),
    delay(7),
    delay(4),
    delay(2),
    delay(5),
    delay(3),
];

class PromiseQueue {
    constructor(promises=[], concurrentCount=0) {
        this.concurrent = concurrentCount;
        this.total = promises.length;
        this.todo = promises;
        this.running = [];
        this.completed = [];
    }

    get runAnother() {
        const concurrentSpace = (this.running.length < this.concurrent);
        return  concurrentSpace && this.todo.length;
    }

    run() {
        while (this.runAnother) {
            const promise = this.todo.shift();

            promise.then(() => {
                this.completed.push(this.running.shift());
                this.run();
            });

            this.running.push(promise);
        }
    }
}

const delayQueue = new PromiseQueue(tasks, 2);
delayQueue.run();
