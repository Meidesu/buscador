"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buscador = void 0;
const cheerio_1 = require("cheerio");
const Indexador_1 = require("./Indexador");
class Buscador {
    constructor() {
        // this._termoPesquisado = termoPesquisado;
        this._indexador = new Indexador_1.Indexador();
        this._indexador._iniciarIndexacao();
    }
    buscar(termoPesquisado) {
        this._termoPesquisado = termoPesquisado;
        // TODO: metodos de para calcular a autoridade das paginas
        // retornar as paginas hierarquizadas por autoridade
    }
    // adicionarPagina(url: string, conteudo: string): void {
    //     this.paginasIndexadas.push(new Pagina(url, conteudo));
    // }
    incrementarAutoridade(url, acumulado) {
        const pagina = this._indexador.paginasIndexadas.find(p => p.url === url);
        if (pagina) {
            pagina.autoridade += acumulado;
        }
    }
    buscarOcorrencias(consulta) {
        const resultados = [];
        for (const pagina of this._indexador.paginasIndexadas) {
            const $ = (0, cheerio_1.load)(pagina.conteudo);
            const ocorrencias = $('*').text().split(consulta.toLowerCase()).length - 1;
            if (ocorrencias > 0) {
                resultados.push(pagina.url);
                pagina.autoridade += ocorrencias * 5;
            }
        }
        return resultados;
    }
}
exports.Buscador = Buscador;
function main() {
    const buscador = new Buscador();
    buscador.buscar('Interestelar');
    const termo = 'Interestelar';
    const urlEncontradas = buscador.buscarOcorrencias(termo);
    console.log('URLs encontradas: ', urlEncontradas);
}
main();
