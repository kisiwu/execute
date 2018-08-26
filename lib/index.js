"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const CmdBuilder_1 = require("./CmdBuilder");
function exec(cmd) {
    return child_process_1.exec(cmd);
}
exports.exec = exec;
function create(cmd, processType) {
    return new CmdBuilder_1.default(cmd, processType);
}
exports.create = create;
//# sourceMappingURL=index.js.map