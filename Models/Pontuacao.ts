export class Pontuacao {
    // private _autoridade: {freqTermo: number, usoTags: number, autoReferencia: number, frescor: number};
    private _freqTermo: number;
    private _usoTags: number;
    private _autoReferencia: number;
    private _frescor: number;
    private _referencia: number;

    constructor(freqTermo: number = 0, usoTags: number = 0, autoReferencia: number = 0, frescor: number = 0) {
        this._freqTermo = freqTermo;
        this._usoTags = usoTags;
        this._autoReferencia = autoReferencia;
        this._frescor = frescor;
        this._referencia = 0;
    }

    get freqTermo(): number {
        return this._freqTermo;
    }

    get usoTags(): number {
        return this._usoTags;
    }

    get autoReferencia(): number {
        return this._autoReferencia;
    }

    get frescor(): number {
        return this._frescor;
    }

    get referencia(): number {
        return this._referencia;
    }

    set freqTermo(freqTermo: number) {
        this._freqTermo = freqTermo;
    }

    set usoTags(usoTags: number) {
        this._usoTags = usoTags;
    }

    set autoReferencia(autoReferencia: number) {
        this._autoReferencia = autoReferencia;
    }

    set frescor(frescor: number) {
        this._frescor = frescor;
    }

    set referencia(referencia: number) {
        this._referencia = referencia;
    }
    
    get total(): number {
        return this._freqTermo + this._usoTags - this._autoReferencia + this._frescor + this._referencia;
    }

    public reset(): void {
        this._freqTermo = 0;
        this._usoTags = 0;
    }
}    