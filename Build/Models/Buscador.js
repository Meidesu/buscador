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
const Parametro_1 = require("./Parametro");
class Buscador {
    constructor() {
        this._paginasRetorno = [];
        this._indexador = new Indexador_1.Indexador();
    }
    InicarBuscador() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._indexador._iniciarIndexacao();
            this._calcularReferencias();
            this._calcularFrescor();
        });
    }
    buscar(termoPesquisado) {
        return this._ranquearPaginas(this.buscarOcorrencias(termoPesquisado));
    }
    buscarOcorrencias(consulta) {
        let paginasRetorno = [];
        for (const pagina of this._indexador.paginasIndexadas) {
            // Set a pontuação inicial como 0;
            pagina.resetarPontuacao();
            const $ = (0, cheerio_1.load)(pagina.conteudo);
            const regex = new RegExp('\\b' + consulta + '\\b', 'gi');
            const resHead = $('head').html();
            const resBody = $('body').text();
            let _usotags = pagina.pontuacao.usoTags;
            let _ocorr = 0;
            if (resHead) {
                _ocorr += (resHead.match(regex) || []).length;
                _usotags += (resHead.match(regex) || []).length * Parametro_1.Parametro.pontoTags.head;
            }
            if (resBody) {
                $('h1').each((index, element) => {
                    const h1Text = $(element).text();
                    _usotags += (h1Text.match(regex) || []).length * Parametro_1.Parametro.pontoTags.h1;
                    _ocorr += (h1Text.match(regex) || []).length;
                });
                $('h2').each((index, element) => {
                    const h2Text = $(element).text();
                    _usotags += (h2Text.match(regex) || []).length * Parametro_1.Parametro.pontoTags.h2;
                    _ocorr += (h2Text.match(regex) || []).length;
                });
                $('p').each((index, element) => {
                    const pText = $(element).text();
                    _usotags += (pText.match(regex) || []).length * Parametro_1.Parametro.pontoTags.p;
                    _ocorr += (pText.match(regex) || []).length;
                });
                $('a').each((index, element) => {
                    const aText = $(element).text();
                    _usotags += (aText.match(regex) || []).length * Parametro_1.Parametro.pontoTags.a;
                    _ocorr += (aText.match(regex) || []).length;
                });
            }
            pagina.pontuacao.usoTags = _usotags;
            pagina.pontuacao.freqTermo = _ocorr * Parametro_1.Parametro.pontoOcorrencia;
            if (_ocorr > 0) {
                paginasRetorno.push(pagina);
            }
        }
        return paginasRetorno;
    }
    _ranquearPaginas(paginas) {
        return paginas.sort((a, b) => {
            let pontuacaoA = a.pontuacao.total;
            let pontuacaoB = b.pontuacao.total;
            if (pontuacaoA > pontuacaoB) {
                return -1;
            }
            else if (pontuacaoA < pontuacaoB) {
                return 1;
            }
            else if (a.pontuacao.freqTermo > b.pontuacao.freqTermo) {
                return -1;
            }
            else if (a.pontuacao.freqTermo < b.pontuacao.freqTermo) {
                return 1;
            }
            else if (a.pontuacao.frescor > b.pontuacao.frescor) {
                return -1;
            }
            else if (a.pontuacao.frescor < b.pontuacao.frescor) {
                return 1;
            }
            else if (a.pontuacao.referencia - a.pontuacao.autoReferencia > b.pontuacao.referencia - b.pontuacao.autoReferencia) {
                return -1;
            }
            else if (a.pontuacao.referencia - a.pontuacao.autoReferencia < b.pontuacao.referencia - b.pontuacao.autoReferencia) {
                return 1;
            }
            else {
                return 0;
            }
        });
    }
    _calcularReferencias() {
        for (let pagina of this._indexador.paginasIndexadas) {
            for (let link of pagina.links) {
                let paginaReferenciada = this._indexador.paginasIndexadas.find(p => p.url === link);
                if (paginaReferenciada) {
                    if (paginaReferenciada.url == pagina.url) {
                        paginaReferenciada.pontuacao.autoReferencia += Parametro_1.Parametro.penalizacaoAuto;
                    }
                    else {
                        paginaReferenciada.pontuacao.referencia += Parametro_1.Parametro.PontoReferencia;
                    }
                }
            }
        }
    }
    _calcularFrescor() {
        for (let pagina of this._indexador.paginasIndexadas) {
            let data = new Date();
            let dataPagina = pagina.data;
            let pontuacao = Parametro_1.Parametro.pontoFrescor;
            // console.log(data);
            // console.log(dataPagina);
            // Se a pagina não tiver data, não será calculado o frescor
            if (!dataPagina) {
                continue;
            }
            let diferenca = data.getFullYear() - dataPagina.getFullYear();
            // console.log('Diferença: ', diferenca);
            pontuacao -= diferenca * Parametro_1.Parametro.penalizacaoAno;
            pagina.pontuacao.frescor = pontuacao;
        }
    }
}
exports.Buscador = Buscador;
// async function main() {
//     const buscador: Buscador = new Buscador();
//     await buscador.InicarBuscador();
//     buscador.buscarOcorrencias('Matrix');
//     buscador._indexador.paginasIndexadas.forEach(p => console.log(p.titulo, p.pontuacao));
// }
// main()
