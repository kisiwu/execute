import { ChildProcess } from 'child_process'
import * as EventEmitter from 'events'

export default class ProcessEventEmitter extends EventEmitter{

    kill: Function;
    write: Function;
    getProcess: Function;

    constructor(process: ChildProcess){
        super();
        var _process: ChildProcess = process;
        _process.stdout.on(
            'data', (d: Buffer) => this.emit('data', d.toString(), d)
        );
        _process.stderr.on(
            'data', (d: Buffer) => this.emit('error', d.toString(), d)
        );
        _process.on(
            'exit', (code: number, signal) => this.emit('exit', code, signal)
        );
        _process.on(
            'close', (code: number, signal) => this.emit('close', code, signal)
        );
        
        this.kill = _process.kill;
        this.write = _process.stdin.write;
        this.getProcess = (): ChildProcess => _process;
    }
}