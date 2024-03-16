import {load} from 'cheerio';
import {Pagina} from './Pagina';
import { Indexador } from './Indexador';


export class Buscador {

    private _termoPesquisado!: string;
    private _indexador: Indexador;

    constructor() {
        // this._termoPesquisado = termoPesquisado;
        this._indexador = new Indexador();
    }

    buscar(termoPesquisado: string): void {
        this._termoPesquisado = termoPesquisado;

        // TODO: metodos de para calcular a autoridade das paginas
        
        // retornar as paginas hierarquizadas por autoridade
    }

    // adicionarPagina(url: string, conteudo: string): void {

    //     this.paginasIndexadas.push(new Pagina(url, conteudo));
    // }

    incrementarAutoridade(url: string, acumulado: number): void {
        const pagina = this._indexador.paginasIndexadas.find(p => p.url === url);

        if (pagina) {
            pagina.autoridade += acumulado;
        } 
    }

    buscarOcorrencias(consulta: string): string[] {
        const resultados: string[] = [];

        for (const pagina of this._indexador.paginasIndexadas) {
            const $ = load(pagina.conteudo);
        
            const ocorrencias = $('*').text().split(consulta.toLowerCase()).length - 1;

            if (ocorrencias > 0) {
                resultados.push(pagina.url);
                pagina.autoridade += ocorrencias * 5;
            }
        }

        return resultados;
    }
}    

function main() {
    const buscador = new Buscador();
}