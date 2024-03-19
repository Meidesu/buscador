import { Pontuacao } from "./Pontuacao";

export class Pagina {
    //url: string, conteudo: string, autoridade: number 
    private _titulo: string;
    private _url: string;
    private _conteudo: string;
    private _pontuacao: Pontuacao;
    private _links: string[] = [];
    private _data: Date | null;

    constructor(titulo: string, url: string, conteudo: string, data: Date | null, links: string[]) {
        this._titulo = titulo;
        this._url = url;
        this._conteudo = conteudo;
        this._pontuacao = new Pontuacao();
        this._links = links;
        this._data = data;
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

    get links(): string[] {
        return this._links;
    }

    get pontuacao(): Pontuacao {
        return this._pontuacao;
    }

    get data(): Date | null {
        return this._data;
    }

    public resetarPontuacao(): void {
        this._pontuacao.reset();
    }
}