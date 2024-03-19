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
exports.App = void 0;
const terminal_kit_1 = require("terminal-kit");
const Buscador_1 = require("./Models/Buscador");
const MyTerminal_1 = require("./Utils/MyTerminal");
const io_utils_1 = require("./Utils/io_utils");
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
        return __awaiter(this, void 0, void 0, function* () {
            yield this.buscador.InicarBuscador();
            MyTerminal_1.MyTerminal.exit();
            terminal_kit_1.terminal.clear();
            this.menu();
            // this.mostrarPaginas(this.buscador._indexador.paginasIndexadas);
            // console.log(this.buscador._indexador.paginasIndexadas);
        });
    }
    menu() {
        let opcoes = ['Fazer busca', 'Sair'];
        // terminal.clear();
        MyTerminal_1.MyTerminal.titulo("Liv-Search");
        // terminal.
        terminal_kit_1.terminal.singleColumnMenu(opcoes, { selectedStyle: terminal_kit_1.terminal.bgGreen, leftPadding: '\t' }, (error, response) => {
            if (error) {
                console.error("Erro ao exibir menu:", error.message);
                return;
            }
            try {
                switch (response.selectedIndex) {
                    case 0:
                        terminal_kit_1.terminal.clear();
                        let termoBusca = io_utils_1.ioutils.input("Digite o termo de busca: ").trim();
                        let pags = this.buscador.buscar(termoBusca);
                        terminal_kit_1.terminal.grabInput(true);
                        this.mostrarPaginas(pags, termoBusca);
                        break;
                    case 1:
                        terminal_kit_1.terminal.grabInput(false);
                        terminal_kit_1.terminal.clear();
                        console.log("Saindo...");
                        terminal_kit_1.terminal.hideCursor(false);
                        terminal_kit_1.terminal.processExit(0);
                        break;
                }
            }
            catch (error) {
                console.error(error.message);
                io_utils_1.ioutils.continuar();
                this.menu();
            }
        });
    }
    // Função para exibir o menu e processar a seleção do usuário
    mostrarPaginas(pags, termoBusca) {
        let titulos = [];
        titulos.push("Mostar tabela de pontuação");
        // Verificar se há páginas para exibir
        if (pags.length == 0) {
            throw new Error(`\nNenhuma página encontrada para o termo: ${termoBusca}`);
        }
        // Separar os títulos das páginas
        pags.forEach(p => {
            titulos.push(p.titulo);
        });
        // Limpar o terminal e exibir o título
        terminal_kit_1.terminal.clear();
        MyTerminal_1.MyTerminal.titulo(`Páginas encontradas para o termo: ${termoBusca}`);
        // Exibir o menu
        terminal_kit_1.terminal.singleColumnMenu(titulos, { selectedStyle: terminal_kit_1.terminal.bgGreen, leftPadding: '\t' }, (error, response) => __awaiter(this, void 0, void 0, function* () {
            if (error) {
                console.error("Erro ao exibir menu:", error);
                return;
            }
            if (response.selectedIndex == 0) {
                MyTerminal_1.MyTerminal.mostrarTabela(pags);
                this.menu();
                return;
            }
            MyTerminal_1.MyTerminal.displayHTML(pags[response.selectedIndex - 1].conteudo);
            // Exibir o menu novamente
            this.menu();
        }));
    }
}
exports.App = App;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = new App();
        yield app.main();
    });
}
main();
