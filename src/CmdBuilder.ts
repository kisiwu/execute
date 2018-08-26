import { exec as cp_exec, fork, ChildProcess } from 'child_process'
import * as path from 'path'

import ProcessEventEmitter from './ProcessEventEmitter'

export default class CmdBuilder {

    processType: string = "";
    cmd: string = "";
    args: string[] = [];
    options = {};

    /**
     * 
     * @param cmd - Script or command to execute 
     */
    constructor(cmd?: string, processType?: string){
        this.cmd = cmd || "";
        this.processType = processType || "";

        if(this.cmd){
            let tmp = this.cmd;
            try{
                require.resolve(tmp);
                this.cmd = tmp;
            }catch(e){
                try{
                    tmp = path.resolve(tmp);
                    require.resolve(tmp);
                    this.cmd = tmp;
                }catch(e){} 
            }
        }
    }

    addArgument(arg: string): CmdBuilder{
        this.args.push(arg);
        return this;
    }

    addOption(name: string, value?: string|number): CmdBuilder{
        if(name.length){
            if(!name.startsWith("-")){
                name = "-"+name;
                if(name.length > 2){
                    name = "-"+name;
                }
            }
            if(typeof value === "undefined"){
                value = "";
            }
            this.options[name] = value;
        }
        return this;
    }

    exec(): ProcessEventEmitter{

        let options: string = "";
        let optionsArray = [];
        if(Object.keys(this.options).length){
            optionsArray = Object.keys(this.options).map(
                name => {
                    let opt = name;
                    let value = this.options[name];
                    if(!(typeof value === "string" && !value)){
                        opt += " "+value;
                    }
                    return opt;
                }
            );
            
            options = optionsArray.join(" ");
        }

        let args: string = this.args.join(" ");

        let cmd: string = this.cmd ? `${this.cmd}` : "";
        cmd += options ? ` ${options}` : "";
        cmd += args ? ` ${args}` : "";

        let process: ChildProcess;
        if(this.processType == 'node'){
            process = fork(this.cmd, optionsArray.concat(this.args), { silent: true });
        }
        else{
            process = cp_exec(`${cmd}`);
        }

        return new ProcessEventEmitter(process);
    }

}