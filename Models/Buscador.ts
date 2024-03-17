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

        // this._calcularReferencias();
        
    }

    public async buscar(termoPesquisado: string): Promise<void> {

        // TODO: metodos de para calcular a autoridade das paginas
        
        // retornar as paginas hierarquizadas por autoridade
    }

    // adicionarPagina(url: string, conteudo: string): void {

    //     this.paginasIndexadas.push(new Pagina(url, conteudo));
    // }

    incrementarAutoridade(pagina: Pagina, acumulado: number): void {
        if (pagina) {
            pagina.autoridade += acumulado;
        } 
    }

    buscarOcorrencias(consulta: string): void {

        for (const pagina of this._indexador.paginasIndexadas) {
            const $ = load(pagina.conteudo);

            const regex = new RegExp('\\b' + consulta + '\\b', 'gi');

            const resHead = $('head').html();
            const resBody = $('body').text();

            if (resBody && resHead) {
                const ocorrenciasHead = (resHead.match(regex) || []).length;
                const ocorrenciasBody = (resBody.match(regex) || []).length;

                this.incrementarAutoridade(pagina, (ocorrenciasHead + ocorrenciasBody) * 5);
            }
        }
    }

    private _calcularReferencias(): void {
        for (let pagina of this._indexador.paginasIndexadas) {
            
            for (let link of pagina.links) {

                let paginaReferenciada = this._indexador.paginasIndexadas.find(p => p.url === link);

                if (paginaReferenciada) {
                    if (paginaReferenciada.url == pagina.url){
                        
                        paginaReferenciada.autoridade -= 20;
                    }else{
                        
                        paginaReferenciada.autoridade += 20;
                    }
                }
            }
        }
    }
}

async function main() {
    const buscador: Buscador = new Buscador();

    await buscador.InicarBuscador();
    buscador.buscarOcorrencias('Matrix');
    
    buscador._indexador.paginasIndexadas.forEach(p => console.log(p.titulo, p.autoridade));

    // const termo: string = 'Interestelar'
    // const urlEncontradas: string[] = buscador.buscarOcorrencias(termo)
    // console.log('URLs encontradas: ', urlEncontradas)
}

main()