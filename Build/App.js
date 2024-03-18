"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const terminal_kit_1 = require("terminal-kit");
const Buscador_1 = require("./Models/Buscador");
const MyTerminal_1 = require("./Utils/MyTerminal");
const readline_sync_1 = require("readline-sync");
// import  from "terminal-kit";
// import { terminal as Terminal } from "terminal-kit";
// import T from "terminal-kit";
// import { singleColumnMenu } from "terminal-kit";
// import { grabInput } from "terminal-kit";
class App {
    // private terminal = Terminal;
    constructor() {
        this.menuOptions = ["Opção 1", "Opção 2", "Opção 3", "Sair"];
        this.buscador = new Buscador_1.Buscador();
    }
    main() {
        this.buscador.InicarBuscador();
        this.sein();
    }
    sein() {
        let opcoes = ['Fazer busca', 'Alterar Parametros', 'Sair'];
        terminal_kit_1.terminal.singleColumnMenu(opcoes, (error, response) => {
            if (error) {
                console.error("Erro ao exibir menu:", error.message);
                return;
            }
            switch (response.selectedIndex) {
                case 0:
                    terminal_kit_1.terminal.grabInput(false);
                    let termoBusca = (0, readline_sync_1.question)("Digite o termo de busca: ");
                    let pags = this.buscador.buscar(termoBusca);
                    if (!pags) {
                        console.log("OXENTE TA VAZIO SAPOHA");
                        return;
                    }
                    this.mostrarPaginas(pags);
                    break;
                case 1:
                    // this.alterarParametros();
                    break;
                case 2:
                    terminal_kit_1.terminal.processExit(0);
                    break;
            }
            this.sein();
        });
    }
    // Função para exibir o menu e processar a seleção do usuário
    mostrarPaginas(pags) {
        let titulos = [];
        pags.forEach(p => {
            titulos.push(p.titulo);
        });
        terminal_kit_1.terminal.clear();
        terminal_kit_1.terminal.singleColumnMenu(titulos, (error, response) => {
            if (error) {
                console.error("Erro ao exibir menu:", error);
                return;
            }
            // Processar a seleção do usuário
            MyTerminal_1.MyTerminal.displayHTML(pags[response.selectedIndex].conteudo);
            // MyTerminal.continuar();
            // terminal.grabInput(false);
            // terminal.processExit(0);
            // Exibir o menu novamente após a seleção do usuário
            // this.mostrarPaginas(pags);
        });
    }
}
exports.App = App;
// cu
function main() {
    const app = new App();
    app.main();
}
main();
