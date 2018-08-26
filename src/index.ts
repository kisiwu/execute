import { exec as cp_exec, ChildProcess } from 'child_process'
import CmdBuilder from './CmdBuilder'

function exec(cmd: string): ChildProcess{
    return cp_exec(cmd)
}

function create(cmd?: string, processType?: string): CmdBuilder{
    return new CmdBuilder(cmd, processType);
}

export {
    exec,
    create
}