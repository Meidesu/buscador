"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyTerminal = void 0;
const terminal_kit_1 = require("terminal-kit");
const node_html_parser_1 = require("node-html-parser");
const io_utils_1 = require("./io_utils");
class MyTerminal {
    static exit() {
        terminal_kit_1.terminal.grabInput(true);
        terminal_kit_1.terminal.on("key", (key) => {
            // console.log(key);
            if ((key === "ESCAPE") || (key === "q")) {
                terminal_kit_1.terminal.grabInput(false);
                terminal_kit_1.terminal.clear();
                console.log("Saindo...");
                terminal_kit_1.terminal.hideCursor(false);
                terminal_kit_1.terminal.processExit(0);
            }
        });
    }
    static displayHTML(html) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                // Converter HTML para texto simples
                const root = (0, node_html_parser_1.parse)(html);
                const text = root.text;
                // Limpar o terminal e exibir o texto
                terminal_kit_1.terminal.clear();
                (0, terminal_kit_1.terminal)(`\n${text}\n`);
                // this.continuar();
                // Fazer algo com o HTML...
                // Quando terminar, chamar resolve()
                io_utils_1.ioutils.continuar();
                resolve();
            });
        });
    }
    // Configurar o terminal
    static titulo(label) {
        let x = Math.round(terminal_kit_1.terminal.width / 2 - label.length / 2);
        // Move o cursor para a posição x e imprime o texto
        // terminal.clear();
        terminal_kit_1.terminal.moveTo(x, -terminal_kit_1.terminal.height);
        terminal_kit_1.terminal.bgColorRgbHex("#4E2559", `${label}\n`);
        terminal_kit_1.terminal.hideCursor(true);
    }
    static mostrarTabela(pags) {
        terminal_kit_1.terminal.clear();
        this.titulo("Tabela de Resultados");
        let data = [
            ['Título', 'Referecia', 'Frescor', 'Ocorrencia', 'Tags', 'Autoreferencia', 'Total']
        ];
        for (let pag of pags) {
            let linha = [];
            linha.push(pag.titulo);
            linha.push(pag.pontuacao.referencia.toString());
            linha.push(pag.pontuacao.frescor.toString());
            linha.push(pag.pontuacao.freqTermo.toString());
            linha.push(pag.pontuacao.usoTags.toString());
            linha.push(pag.pontuacao.autoReferencia.toString());
            linha.push(pag.pontuacao.total.toString());
            data.push(linha);
        }
        terminal_kit_1.terminal.table(data, {
            hasBorder: true,
            contentHasMarkup: true,
            borderChars: 'lightRounded',
            borderAttr: { color: 'blue' },
            textAttr: { bgColor: 'default' },
            width: 80,
            fit: true
        });
        io_utils_1.ioutils.continuar();
    }
}
exports.MyTerminal = MyTerminal;
