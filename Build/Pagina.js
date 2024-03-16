"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagina = void 0;
class Pagina {
    constructor(titulo, url, conteudo, links, autoridade = 0) {
        this._links = [];
        this._titulo = titulo;
        this._url = url;
        this._conteudo = conteudo;
        this._autoridade = autoridade;
        this._links = links;
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
    get autoridade() {
        return this._autoridade;
    }
    set autoridade(value) {
        this._autoridade = value;
    }
    get links() {
        return this._links;
    }
}
exports.Pagina = Pagina;
