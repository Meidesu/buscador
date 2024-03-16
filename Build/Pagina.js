"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagina = void 0;
// só continuar aqui fds
class Pagina {
    constructor(url, conteudo, autoridade = 0) {
        this._url = url;
        this._conteudo = conteudo;
        this._autoridade = autoridade;
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
}
exports.Pagina = Pagina;
