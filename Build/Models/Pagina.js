"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagina = void 0;
const Pontuacao_1 = require("./Pontuacao");
class Pagina {
    constructor(titulo, url, conteudo, data, links) {
        this._links = [];
        this._titulo = titulo;
        this._url = url;
        this._conteudo = conteudo;
        this._pontuacao = new Pontuacao_1.Pontuacao();
        this._links = links;
        this._data = data;
    }
    get titulo() {
        return this._titulo;
    }
    get url() {
        return this._url;
    }
    get conteudo() {
        return this._conteudo;
    }
    get links() {
        return this._links;
    }
    get pontuacao() {
        return this._pontuacao;
    }
    get data() {
        return this._data;
    }
    resetarPontuacao() {
        this._pontuacao.reset();
    }
}
exports.Pagina = Pagina;
