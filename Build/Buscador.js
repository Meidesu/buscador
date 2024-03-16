"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = require("cheerio");
const Pagina_1 = require("./Pagina");
class Buscador {
    constructor() {
        this.paginasIndexadas = [];
    }
    adicionarPagina(url, conteudo) {
        this.paginasIndexadas.push(new Pagina_1.Pagina(url, conteudo));
    }
    incrementarAutoridade(url, acumulado) {
        const pagina = this.paginasIndexadas.find(p => p.url === url);
        if (pagina) {
            pagina.autoridade += acumulado;
        }
    }
    buscar(consulta) {
        const resultados = [];
        for (const pagina of this.paginasIndexadas) {
            const $ = (0, cheerio_1.load)(pagina.conteudo);
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
