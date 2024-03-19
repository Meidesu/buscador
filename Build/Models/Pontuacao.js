"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pontuacao = void 0;
class Pontuacao {
    constructor(freqTermo = 0, usoTags = 0, autoReferencia = 0, frescor = 0) {
        this._freqTermo = freqTermo;
        this._usoTags = usoTags;
        this._autoReferencia = autoReferencia;
        this._frescor = frescor;
        this._referencia = 0;
    }
    get freqTermo() {
        return this._freqTermo;
    }
    get usoTags() {
        return this._usoTags;
    }
    get autoReferencia() {
        return this._autoReferencia;
    }
    get frescor() {
        return this._frescor;
    }
    get referencia() {
        return this._referencia;
    }
    set freqTermo(freqTermo) {
        this._freqTermo = freqTermo;
    }
    set usoTags(usoTags) {
        this._usoTags = usoTags;
    }
    set autoReferencia(autoReferencia) {
        this._autoReferencia = autoReferencia;
    }
    set frescor(frescor) {
        this._frescor = frescor;
    }
    set referencia(referencia) {
        this._referencia = referencia;
    }
    get total() {
        return this._freqTermo + this._usoTags - this._autoReferencia + this._frescor + this._referencia;
    }
    reset() {
        this._freqTermo = 0;
        this._usoTags = 0;
    }
}
exports.Pontuacao = Pontuacao;
