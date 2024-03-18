import {load} from 'cheerio';
import {Pagina} from './Pagina';
import { Indexador } from './Indexador';

export class Buscador {
    public _indexador: Indexador;
    public _paginasRetorno: Pagina[] = [];

    constructor() {
        this._indexador = new Indexador();
    }

    public async InicarBuscador(): Promise<void> {
        await this._indexador._iniciarIndexacao();

        this._calcularReferencias();
        this._calcularFrescor();
        
    }

    public buscar(termoPesquisado: string): Pagina[] {
        this.buscarOcorrencias(termoPesquisado);

        return this._paginasRetorno;
    }

    buscarOcorrencias(consulta: string): void {
        for (const pagina of this._indexador.paginasIndexadas) {
            const $ = load(pagina.conteudo);

            const regex = new RegExp('\\b' + consulta + '\\b', 'gi');

            const resHead = $('head').html();
            const resBody = $('body').text();

            let _usotags: number = pagina.pontuacao.usoTags;
            let _ocorr: number = 0; 

            if (resHead) {

                _ocorr += (resHead.match(regex) || []).length;
                _usotags += (resHead.match(regex) || []).length * 20;
            }

            if (resBody) {
              
                $('h1').each((index, element) => {
                    const h1Text = $(element).text();
                    _usotags += (h1Text.match(regex) || []).length * 15;
                    _ocorr += (h1Text.match(regex) || []).length;
                });

                $('h2').each((index, element) => {
                    const h2Text = $(element).text();
                    _usotags += (h2Text.match(regex) || []).length * 10;
                    _ocorr += (h2Text.match(regex) || []).length;
                });

                $('p').each((index, element) => {
                    const pText = $(element).text();
                    _usotags += (pText.match(regex) || []).length * 5;
                    _ocorr += (pText.match(regex) || []).length;
                });

                $('a').each((index, element) => {
                    const aText = $(element).text();
                    _usotags += (aText.match(regex) || []).length * 2;
                    _ocorr += (aText.match(regex) || []).length;
                });
            }

            pagina.pontuacao.usoTags = _usotags;
            pagina.pontuacao.freqTermo = _ocorr * 5;

            if (_ocorr > 0) {
                this._paginasRetorno.push(pagina);
            }
        }
    }

    private _calcularReferencias(): void {
        for (let pagina of this._indexador.paginasIndexadas) {
            
            for (let link of pagina.links) {

                let paginaReferenciada = this._indexador.paginasIndexadas.find(p => p.url === link);

                if (paginaReferenciada) {
                    if (paginaReferenciada.url == pagina.url){
                        
                        paginaReferenciada.pontuacao.autoReferencia += 20;
                    }else{
                        
                        paginaReferenciada.pontuacao.referencia += 20;
                    }
                }
            }
        }
    }

    private _calcularFrescor(): void {
        for (let pagina of this._indexador.paginasIndexadas) {
            let data = new Date();
            let dataPagina = pagina.data;
            let pontuacao = 30;

            // console.log(data);
            // console.log(dataPagina);
            
            // Se a pagina não tiver data, não será calculado o frescor
            if (!dataPagina) {
                continue;
            }

            let diferenca = data.getFullYear() - dataPagina.getFullYear();

            // console.log('Diferença: ', diferenca);

            pontuacao -= diferenca * 5;
            pagina.pontuacao.frescor = pontuacao;
        }
    }
}

// async function main() {
//     const buscador: Buscador = new Buscador();

//     await buscador.InicarBuscador();

//     buscador.buscarOcorrencias('Matrix');
    
//     buscador._indexador.paginasIndexadas.forEach(p => console.log(p.titulo, p.pontuacao));
// }

// main()