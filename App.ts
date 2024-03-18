import { terminal } from "terminal-kit";
import { Buscador } from "./Models/Buscador";
import { Pagina } from "./Models/Pagina";
import { Indexador } from "./Models/Indexador";
import { MyTerminal } from "./Utils/MyTerminal";
import { question } from "readline-sync";
// import  from "terminal-kit";

// import { terminal as Terminal } from "terminal-kit";
// import T from "terminal-kit";
// import { singleColumnMenu } from "terminal-kit";
// import { grabInput } from "terminal-kit";

export class App {

    public buscador: Buscador;
    private menuOptions = ["Opção 1", "Opção 2", "Opção 3", "Sair"];
    // private terminal = Terminal;

    constructor() {
        this.buscador = new Buscador();
    }

    public main(): void {
        this.buscador.InicarBuscador();
        this.sein();
    }

    public sein() {
        let opcoes: string[] = ['Fazer busca', 'Alterar Parametros', 'Sair'];

        terminal.singleColumnMenu(opcoes, (error: Error, response) => {
            if (error) {
                console.error("Erro ao exibir menu:", error.message);
                return;
            }
            switch (response.selectedIndex) {
                case 0:
                    terminal.grabInput(false);
                    
                    let termoBusca: string = question("Digite o termo de busca: ");
                    let pags: Pagina[] = this.buscador.buscar(termoBusca);
                    
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

                    terminal.processExit(0);
                    break;
            }
            
            this.sein();
        });

        
    }

// Função para exibir o menu e processar a seleção do usuário
    public mostrarPaginas(pags: Pagina[]) {
        let titulos: string[] = []; 

        pags.forEach(p => {
            titulos.push(p.titulo);
        });

        terminal.clear();
        terminal.singleColumnMenu(titulos, (error: Error, response) => {
            if (error) {
                console.error("Erro ao exibir menu:", error);
                return;
            }

            // Processar a seleção do usuário
            MyTerminal.displayHTML(pags[response.selectedIndex].conteudo);

            // MyTerminal.continuar();
            // terminal.grabInput(false);
            // terminal.processExit(0);
            // Exibir o menu novamente após a seleção do usuário
            // this.mostrarPaginas(pags);
        });   
    }
}

// cu

function main(){
    
    const app = new App();
    app.main();
}

main();