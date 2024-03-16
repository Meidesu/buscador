import {load} from 'cheerio';
import {Pagina} from './Pagina';


class Buscador {
    private paginasIndexadas: Pagina[];// ok

    constructor() {
        this.paginasIndexadas = []
    }

    adicionarPagina(url: string, conteudo: string): void {

        this.paginasIndexadas.push(new Pagina(url, conteudo));
    }

    incrementarAutoridade(url: string, acumulado: number): void {
        const pagina = this.paginasIndexadas.find(p => p.url === url)
        if (pagina) {
            pagina.autoridade += acumulado;
        }
    }

    buscar(consulta: string): string[] {
        const resultados: string[] = [];

        for (const pagina of this.paginasIndexadas) {
            const $ = load(pagina.conteudo);
            

            // não entendeu?
            const ocorrencias = $('*').text().split(consulta.toLowerCase()).length - 1;

            if (ocorrencias > 0) {
                resultados.push(pagina.url);
                pagina.autoridade += ocorrencias * 5;
            }
        }

        return resultados;

        // o que exatamente ela retorna?
        
    }
}    