// só continuar aqui fds
export class Pagina {
    //url: string, conteudo: string, autoridade: number 
    private _url: string;
    private _conteudo: string;
    private _autoridade: number;

    constructor(url: string, conteudo: string, autoridade: number = 0) {
        this._url = url;
        this._conteudo = conteudo;
        this._autoridade = autoridade;
    }

    get url(): string {
        return this._url;
    }

    get conteudo(): string {
        return this._conteudo;
    }

    get autoridade(): number {
        return this._autoridade;
    }

    set autoridade(value: number) {
        this._autoridade = value;
    }

}