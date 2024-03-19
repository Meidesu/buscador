"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ioutils = void 0;
const readline_sync_1 = require("readline-sync");
const terminal_kit_1 = require("terminal-kit");
class ioutils {
    static input(label) {
        terminal_kit_1.terminal.grabInput(false);
        terminal_kit_1.terminal.clear();
        terminal_kit_1.terminal.hideCursor(false);
        let out = (0, readline_sync_1.question)(label);
        while (out == '') {
            console.log("Texto está vazio!\n");
            out = (0, readline_sync_1.question)(label);
        }
        return out;
        // return question(label);
    }
    static continuar() {
        terminal_kit_1.terminal.grabInput(false);
        // enter ou espaco apenas
        (0, readline_sync_1.question)("[Enter...]", { hideEchoBack: true, mask: '' });
        terminal_kit_1.terminal.clear();
    }
}
exports.ioutils = ioutils;
