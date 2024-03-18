"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myTerminal = void 0;
const terminal_kit_1 = require("terminal-kit");
const node_html_parser_1 = require("node-html-parser");
class myTerminal {
    static continuar() {
        terminal_kit_1.terminal.on("key", (key) => {
            if (key === "ENTER" || key === "SPACE") {
                terminal_kit_1.terminal.grabInput(false);
                terminal_kit_1.terminal.clear();
                terminal_kit_1.terminal.hideCursor(false);
                terminal_kit_1.terminal.processExit(0);
            }
        });
    }
    static displayHTML(html) {
        // Converter HTML para texto simples
        const root = (0, node_html_parser_1.parse)(html);
        const text = root.text;
        // Limpar o terminal e exibir o texto
        terminal_kit_1.terminal.clear();
        (0, terminal_kit_1.terminal)(`\n${text}\n`);
        // Escutar por eventos de teclado
        this.continuar();
    }
}
exports.myTerminal = myTerminal;
