import { terminal } from "terminal-kit";
import { Buscador } from "./Models/Buscador";
import { Pagina } from "./Models/Pagina";
import { Indexador } from "./Models/Indexador";
import { MyTerminal } from "./Utils/MyTerminal";
import { question } from "readline-sync";
import { ioutils } from "./Utils/io_utils";
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

    public async main(): Promise<void> {
        await this.buscador.InicarBuscador();

        

        MyTerminal.exit();
        terminal.clear();
        this.menu();
        // this.mostrarPaginas(this.buscador._indexador.paginasIndexadas);
        // console.log(this.buscador._indexador.paginasIndexadas);
    }

    public menu() {

        let opcoes: string[] = ['Fazer busca', 'Sair'];
        // terminal.clear();
        
        MyTerminal.titulo("Liv-Search");

        // terminal.

        terminal.singleColumnMenu(opcoes, {selectedStyle: terminal.bgGreen, leftPadding: '\t' }, (error: Error, response) => {
            if (error) {
                console.error("Erro ao exibir menu:", error.message);
                return;
            }
            
            try{
                switch (response.selectedIndex) {
                    case 0:

                        terminal.clear();
                        let termoBusca: string = ioutils.input("Digite o termo de busca: ").trim();
                        let pags: Pagina[] = this.buscador.buscar(termoBusca);
                        
                        terminal.grabInput(true)
                        this.mostrarPaginas(pags, termoBusca);
    
                        break;
                    case 1:

                        terminal.grabInput(false);
                        terminal.clear();
                        console.log("Saindo...")
                        terminal.hideCursor(false);
                        terminal.processExit(0);
                        break;
    
                    }
            } catch (error: any) {

                console.error(error.message);
                ioutils.continuar();
                this.menu();
            }    
        });
    }

// Função para exibir o menu e processar a seleção do usuário
    public mostrarPaginas(pags: Pagina[], termoBusca: string) {
        let titulos: string[] = []; 

        titulos.push("Mostar tabela de pontuação");
        
        // Verificar se há páginas para exibir
        if ( pags.length == 0 ){
            throw new Error(`\nNenhuma página encontrada para o termo: ${termoBusca}`);
        }

        // Separar os títulos das páginas
        pags.forEach(p => {
            titulos.push(p.titulo);
        });


        // Limpar o terminal e exibir o título
        terminal.clear();
        MyTerminal.titulo(`Páginas encontradas para o termo: ${termoBusca}`);

        // Exibir o menu
        terminal.singleColumnMenu(titulos, {selectedStyle: terminal.bgGreen, leftPadding: '\t' }, async (error: Error, response) => {
            if (error) {
                console.error("Erro ao exibir menu:", error);
                return;
            }          

            if (response.selectedIndex == 0){
                MyTerminal.mostrarTabela(pags);
                this.menu();
                return;
            }

            MyTerminal.displayHTML(pags[response.selectedIndex - 1].conteudo);

            // Exibir o menu novamente
            this.menu();
        });   
    }    
}

async function main(){

    const app = new App();
    await app.main();
}

main();