console.log(process.pid);
console.log(process.versions.node);
console.log(process.argv);

const grab = flag => {
    let indexAfterFlag = process.argv.indexOf(flag) + 1;
    return process.argv[indexAfterFlag];
}
const name = grab("--name");
const age = grab("--age");
console.log(`Your name is ${name}, you are ${age} years old.`);
// node n1_globalProcess --age 23 --name "Ahmed Ibrahim"
