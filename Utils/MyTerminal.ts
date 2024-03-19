import { terminal } from "terminal-kit";
import {parse} from "node-html-parser";
import { ioutils } from "./io_utils";
import { Pagina } from "../Models/Pagina";

export class MyTerminal {
    public static exit(){
        terminal.grabInput(true);

        
        terminal.on("key", (key: string) => {

            // console.log(key);
            
            if ((key === "ESCAPE") || (key === "q")) {
                terminal.grabInput(false);
                terminal.clear();
                console.log("Saindo...")
                terminal.hideCursor(false);
                terminal.processExit(0);
            }
        })
    }

    public static async displayHTML(html: string): Promise<void>{
        return new Promise((resolve, reject) => {
            // Converter HTML para texto simples
            const root = parse(html);
            const text = root.text;
        
            // Limpar o terminal e exibir o texto
            terminal.clear();
            terminal(`\n${text}\n`);
            // this.continuar();
            // Fazer algo com o HTML...
            // Quando terminar, chamar resolve()
            
            ioutils.continuar();
            resolve();
        });
    }

    // Configurar o terminal
    public static titulo(label: string){
        
        let x = Math.round(terminal.width / 2 - label.length / 2);
        
        // Move o cursor para a posição x e imprime o texto
        // terminal.clear();
        terminal.moveTo(x, -terminal.height);
        terminal.bgColorRgbHex("#4E2559", `${label}\n`)
        terminal.hideCursor(true);
    }    

    public static mostrarTabela(pags: Pagina[]): void{
        terminal.clear();
        this.titulo("Tabela de Resultados")

        let data: string[][] = [
            ['Título', 'Referecia', 'Frescor', 'Ocorrencia', 'Tags', 'Autoreferencia', 'Total' ]

        ];

            for (let pag of pags) {
                let linha: string[] = [];

                linha.push(pag.titulo);
                linha.push(pag.pontuacao.referencia.toString());
                linha.push(pag.pontuacao.frescor.toString());
                linha.push(pag.pontuacao.freqTermo.toString());
                linha.push(pag.pontuacao.usoTags.toString());
                linha.push(pag.pontuacao.autoReferencia.toString());
                linha.push(pag.pontuacao.total.toString());

                data.push(linha);
            }

            terminal.table(data, {
                hasBorder: true,
                contentHasMarkup: true,
                borderChars: 'lightRounded',
                borderAttr: { color: 'blue' },
                textAttr: { bgColor: 'default' },
                width: 80,
                fit: true
            });

            ioutils.continuar();
    }
}