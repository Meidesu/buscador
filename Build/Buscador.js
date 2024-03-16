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
exports.Buscador = void 0;
const cheerio_1 = require("cheerio");
const Indexador_1 = require("./Indexador");
class Buscador {
    constructor() {
        this._paginasRetorno = [];
        this._indexador = new Indexador_1.Indexador();
    }
    InicarBuscador() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._indexador._iniciarIndexacao();
            // this._calcularReferencias();
        });
    }
    buscar(termoPesquisado) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: metodos de para calcular a autoridade das paginas
            // retornar as paginas hierarquizadas por autoridade
        });
    }
    // adicionarPagina(url: string, conteudo: string): void {
    //     this.paginasIndexadas.push(new Pagina(url, conteudo));
    // }
    incrementarAutoridade(pagina, acumulado) {
        if (pagina) {
            pagina.autoridade += acumulado;
        }
    }
    buscarOcorrencias(consulta) {
        for (const pagina of this._indexador.paginasIndexadas) {
            const $ = (0, cheerio_1.load)(pagina.conteudo);
            const regex = new RegExp('\\b' + consulta + '\\b', 'gi');
            const resHead = $('head').html();
            const resBody = $('body').text();
            if (resBody && resHead) {
                const ocorrenciasHead = (resHead.match(regex) || []).length;
                const ocorrenciasBody = (resBody.match(regex) || []).length;
                this.incrementarAutoridade(pagina, (ocorrenciasHead + ocorrenciasBody) * 5);
            }
        }
    }
    _calcularReferencias() {
        for (let pagina of this._indexador.paginasIndexadas) {
            for (let link of pagina.links) {
                let paginaReferenciada = this._indexador.paginasIndexadas.find(p => p.url === link);
                if (paginaReferenciada) {
                    if (paginaReferenciada.url == pagina.url) {
                        paginaReferenciada.autoridade -= 20;
                    }
                    else {
                        paginaReferenciada.autoridade += 20;
                    }
                }
            }
        }
    }
}
exports.Buscador = Buscador;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const buscador = new Buscador();
        yield buscador.InicarBuscador();
        buscador.buscarOcorrencias('Matrix');
        buscador._indexador.paginasIndexadas.forEach(p => console.log(p.titulo, p.autoridade));
        // const termo: string = 'Interestelar'
        // const urlEncontradas: string[] = buscador.buscarOcorrencias(termo)
        // console.log('URLs encontradas: ', urlEncontradas)
    });
}
main();
