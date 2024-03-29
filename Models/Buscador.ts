import {load} from 'cheerio';
import {Pagina} from './Pagina';
import { Indexador } from './Indexador';
import { Parametro } from './Parametro';

export class Buscador {
    public _indexador: Indexador;
    public _paginasRetorno: Pagina[] = [];

    constructor() {
        // "https://g1.globo.com/pi/piaui/"
        this._indexador = new Indexador(3);
    }


    //ele inicia a indexação e calcula as pontuações estáticas de forma assíncrona
    public async InicarBuscador(): Promise<void> {
        await this._indexador._iniciarIndexacao();

        this._calcularReferencias();
        this._calcularFrescor();
    } 

    //busca o array de páginas já ranqueadas
    public buscar(termoPesquisado: string): Pagina[] {
         
        return this._ranquearPaginas(this.buscarOcorrencias(termoPesquisado));
    }

    buscarOcorrencias(consulta: string): Pagina[] {
        let paginasRetorno: Pagina[] = []; 
        for (const pagina of this._indexador.paginasIndexadas) {
            // Set a pontuação inicial como 0;
            pagina.resetarPontuacao();

            const $ = load(pagina.conteudo);

            const regex = new RegExp('\\b' + consulta + '\\b', 'gi');

            const resHead = $('head').html();
            const resBody = $('body').text();

            let _usotags: number = pagina.pontuacao.usoTags;
            let _ocorr: number = 0; 

            // if que vai pegar o conteudo da head e do body e verificar se tem o termo pesquisado
            if (resHead) {

                _ocorr += (resHead.match(regex) || []).length;
                _usotags += (resHead.match(regex) || []).length * Parametro.pontoTags.head;
            }

            if (resBody) {
              
                $('h1').each((index, element) => {
                    const h1Text = $(element).text();
                    _usotags += (h1Text.match(regex) || []).length * Parametro.pontoTags.h1;
                    _ocorr += (h1Text.match(regex) || []).length;
                });

                $('h2').each((index, element) => {
                    const h2Text = $(element).text();
                    _usotags += (h2Text.match(regex) || []).length * Parametro.pontoTags.h2;
                    _ocorr += (h2Text.match(regex) || []).length;
                });

                $('p').each((index, element) => {
                    const pText = $(element).text();
                    _usotags += (pText.match(regex) || []).length * Parametro.pontoTags.p;
                    _ocorr += (pText.match(regex) || []).length;
                });

                $('a').each((index, element) => {
                    const aText = $(element).text();
                    _usotags += (aText.match(regex) || []).length * Parametro.pontoTags.a;
                    _ocorr += (aText.match(regex) || []).length;
                });
            }

            pagina.pontuacao.usoTags = _usotags;
            pagina.pontuacao.freqTermo = _ocorr * Parametro.pontoOcorrencia;
            
            //só adiciona um array de páginas àquelas que tiverem ocorrências
            if (_ocorr > 0) {
                paginasRetorno.push(pagina);
            }
        }
        return paginasRetorno;
    }
    private _ranquearPaginas(paginas: Pagina[]): Pagina[] {
        return paginas.sort((a, b) => {
            let pontuacaoA = a.pontuacao.total;
            let pontuacaoB = b.pontuacao.total;

            if (pontuacaoA > pontuacaoB) {
                return -1;
            } else if (pontuacaoA < pontuacaoB) {
                return 1;
            } else if ( a.pontuacao.freqTermo > b.pontuacao.freqTermo){
                return -1;  
            }
            else if ( a.pontuacao.freqTermo < b.pontuacao.freqTermo){   
                return 1;   
            }
            else if (a.pontuacao.frescor > b.pontuacao.frescor) {   
                return -1;
            }
            else if (a.pontuacao.frescor < b.pontuacao.frescor) {
                return 1;
            }
            else if (a.pontuacao.referencia - a.pontuacao.autoReferencia > b.pontuacao.referencia - b.pontuacao.autoReferencia ){
                return -1;
            }
            else if (a.pontuacao.referencia - a.pontuacao.autoReferencia < b.pontuacao.referencia - b.pontuacao.autoReferencia ){
                return 1;
            }
            else {
                return 0;
            }
        });
    }

    private _calcularReferencias(): void {
        for (let pagina of this._indexador.paginasIndexadas) {
            
            for (let link of pagina.links) {
                //encontrar a página pela url
                let paginaReferenciada = this._indexador.paginasIndexadas.find(p => p.url === link);

                if (paginaReferenciada) {
                    if (paginaReferenciada.url == pagina.url){
                        
                        paginaReferenciada.pontuacao.autoReferencia += Parametro.penalizacaoAuto;   
                    }else{
                        
                        paginaReferenciada.pontuacao.referencia += Parametro.PontoReferencia;
                    }
                }
            }
        }
    }

    private _calcularFrescor(): void {
        for (let pagina of this._indexador.paginasIndexadas) {
            let data = new Date();
            let dataPagina = pagina.data;
            let pontuacao = Parametro.pontoFrescor;

            // Se a pagina não tiver data, não será calculado o frescor
            if (!dataPagina) {
                continue;
            }

            let diferenca = data.getFullYear() - dataPagina.getFullYear();

            if(diferenca === 0 || diferenca === 1){
                pontuacao -= diferenca * Parametro.penalizacaoAno;
            }
            else{
                pontuacao -= (diferenca - 1) * Parametro.penalizacaoAno;
            }
            pagina.pontuacao.frescor = pontuacao;
        }
    }
}