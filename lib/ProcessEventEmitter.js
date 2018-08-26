"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventEmitter = require("events");
class ProcessEventEmitter extends EventEmitter {
    constructor(process) {
        super();
        var _process = process;
        _process.stdout.on('data', (d) => this.emit('data', d.toString(), d));
        _process.stderr.on('data', (d) => this.emit('error', d.toString(), d));
        _process.on('exit', (code, signal) => this.emit('exit', code, signal));
        _process.on('close', (code, signal) => this.emit('close', code, signal));
        this.kill = _process.kill;
        this.write = _process.stdin.write;
        this.getProcess = () => _process;
    }
}
exports.default = ProcessEventEmitter;
//# sourceMappingURL=ProcessEventEmitter.js.map