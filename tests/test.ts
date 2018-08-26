import {create} from '../src/index';

let b;
b = create(`tests/bin/hello.js`, 'node'); // node
//b = create(`tests/bin/hello.bat`); // bat

//b.addArgument("Hello");
//b.addArgument("My MAn");

b.exec()
.on('data', d => console.log("[data]:",d))
.on('error', d => console.error("[error]:",d))
.on('close', code => console.log("[close]:",code));

//.kill() // kills the child process (ref: child_process.kill)
//.write(chunk, cb) // writes in stdin (ref: child_process.stdin.write)
//.getProcess() // gets the child process