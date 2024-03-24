//bibliotecas utilizadas para o projeto
import axios from 'axios';
import { load } from 'cheerio';
import fs from 'fs';
import { Pagina } from './Pagina';

//classe  indexador
export class Indexador{
    private _paginasIndexadas: Pagina[];
    private _index: string;
    private _ProfMax: number;
    
    constructor(index?: string, profMax?: number){
        this._paginasIndexadas = [];
        this._index = index || 'https://meidesu.github.io/movies-pages/interestelar.html';
        this._ProfMax = profMax || 2;
    }

    public async _iniciarIndexacao(): Promise<void>{
        await this.indexar(this._index);
        console.log('Indexação concluída');
    }

    public async indexar(url: string, prof: number = 0): Promise<void>{
        // verifica se a url ja foi indexada
        let profAtual = prof;

        if(this._indexado(url)){
            console.log('URL já indexada');
            return;
        } 

        // Verifica se o link pertence a mesma página
        if(!url.startsWith(this._index)){
            console.log('Link não pertence a mesma página');
            return;
        }

        // faz a requisição
        const response = await axios.get(url);
        // extrai o conteudo da pagina
        const conteudo: string = response.data;
        // carrega o conteudo html
        const $ = load(conteudo);
        // obtem o titulo da pagina
        const titulo = $('title').text();
        // extrai a data da pagina
        const emElement = $('p').text();
        const regex = /\d{2}\/\d{2}\/\d{4}/;
        const match = emElement.match(regex);
        const dataPag = match ? match[0] : null;
        
        // verifica a data da pagina(se ela é válida)
        let data: Date | null;
        if(dataPag){
            const [dia, mes, ano] = dataPag.split('/').map(Number);
            data = new Date(ano, mes - 1, dia);
        } else {
            data = null;
        }        
        
        // obtem as paginas da tag <a>
        const tagsA = $('a');
        const links: string[] = [];
    
        for ( let tag of tagsA){
            const href = $(tag).attr("href");
            if(href){
                links.push(href);
            }
        }

        try{
            this._salvarArquivo(titulo, conteudo);

        } catch (e: any){
            console.log(e.message);
        }
        
        console.log(`Indexando ${titulo}`);
        
        // cria uma instancia e add ela na lista de paginas indexadas
        this._paginasIndexadas.push(new Pagina(titulo, url, conteudo, data, links));

    
        // Verifica se a página atual está indexada
        if(this._indexado(url) && profAtual < this._ProfMax){
            // Limita a indexação apenas aos links da página

            for (let link of links){
                // console.log(`Indexando ${link}`);
                
                await this.indexar(link, profAtual + 1);
            }
        }
    }
    

    private _salvarArquivo(titulo: string, conteudo: string) {
        let _nomeArquivo: string = titulo.split(' ').slice(0, 4).join('_');
        
        try{
            console.log(`Salvando arquivo ${_nomeArquivo}`);
            
            fs.writeFileSync(`../Pages/${_nomeArquivo}.html`, conteudo);
        } catch (error) {
            throw new Error('Erro ao salvar o arquivo');
        }
    }

    // Metodo que verifica se a URL já foi indexada
    private _indexado(url: string): boolean{
        for (let pagina of this._paginasIndexadas){
            if(pagina.url === url){
                return true;
            }
        }
        
        return false;
    }

    public get paginasIndexadas(): Pagina[]{
        return this._paginasIndexadas;
    }    
}