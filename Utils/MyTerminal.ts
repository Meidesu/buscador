import { terminal } from "terminal-kit";
import {parse} from "node-html-parser";

export class MyTerminal {
    public static continuar(){
        console.log("\nPressione ENTER para continuar...");
        
        terminal.grabInput(true);
        terminal.on("key", (key: string) => {
            if (key === "ENTER") {
                terminal.grabInput(false);
                terminal.clear();
                terminal.hideCursor(false);
                terminal.processExit(0);
            }
        });
    }

    public static displayHTML(html: string) {
        // Converter HTML para texto simples
        const root = parse(html);
        const text = root.text;
    
        // Limpar o terminal e exibir o texto
        terminal.clear();
        terminal(`\n${text}\n`);
        this.continuar();
    }
}