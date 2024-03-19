import { keyIn, question } from "readline-sync";
import { terminal } from "terminal-kit";

export class ioutils {
    public static input(label: string): string{
        terminal.grabInput(false);
        terminal.clear();
        terminal.hideCursor(false);

        let out: string = question(label);
      
        while ( out == '' ){
          console.log("Texto está vazio!\n");
          out = question(label);
        }
      
        return out;
        // return question(label);
      }

    public static continuar(): void{
      terminal.grabInput(false);

      // enter ou espaco apenas
      question("[Enter...]", {hideEchoBack: true, mask: ''});
      terminal.clear(); 
    }
}