"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path = require("path");
const ProcessEventEmitter_1 = require("./ProcessEventEmitter");
class CmdBuilder {
    /**
     *
     * @param cmd - Script or command to execute
     */
    constructor(cmd, processType) {
        this.processType = "";
        this.cmd = "";
        this.args = [];
        this.options = {};
        this.cmd = cmd || "";
        this.processType = processType || "";
        if (this.cmd) {
            let tmp = this.cmd;
            try {
                require.resolve(tmp);
                this.cmd = tmp;
            }
            catch (e) {
                try {
                    tmp = path.resolve(tmp);
                    require.resolve(tmp);
                    this.cmd = tmp;
                }
                catch (e) { }
            }
        }
    }
    addArgument(arg) {
        this.args.push(arg);
        return this;
    }
    addOption(name, value) {
        if (name.length) {
            if (!name.startsWith("-")) {
                name = "-" + name;
                if (name.length > 2) {
                    name = "-" + name;
                }
            }
            if (typeof value === "undefined") {
                value = "";
            }
            this.options[name] = value;
        }
        return this;
    }
    exec() {
        let options = "";
        let optionsArray = [];
        if (Object.keys(this.options).length) {
            optionsArray = Object.keys(this.options).map(name => {
                let opt = name;
                let value = this.options[name];
                if (!(typeof value === "string" && !value)) {
                    opt += " " + value;
                }
                return opt;
            });
            options = optionsArray.join(" ");
        }
        let args = this.args.join(" ");
        let cmd = this.cmd ? `${this.cmd}` : "";
        cmd += options ? ` ${options}` : "";
        cmd += args ? ` ${args}` : "";
        let process;
        if (this.processType == 'node') {
            process = child_process_1.fork(this.cmd, optionsArray.concat(this.args), { silent: true });
        }
        else {
            process = child_process_1.exec(`${cmd}`);
        }
        return new ProcessEventEmitter_1.default(process);
    }
}
exports.default = CmdBuilder;
//# sourceMappingURL=CmdBuilder.js.map