export class Pagina {
    //url: string, conteudo: string, autoridade: number 
    private _titulo: string;
    private _url: string;
    private _conteudo: string;
    private _autoridade: number;
    private _links: string[] = [];

    constructor(titulo: string, url: string, conteudo: string, links: string[], autoridade: number = 0) {
        this._titulo = titulo;
        this._url = url;
        this._conteudo = conteudo;
        this._autoridade = autoridade;
        this._links = links;
    }

    get titulo(): string {
        return this._titulo;
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

    get links(): string[] {
        return this._links;
    }

}