import axios from 'axios';
import cheerio, { load } from 'cheerio';
import fs, { link } from 'fs';
import { Pagina } from './Pagina';

export class Indexador{
    private _paginasIndexadas: Pagina[];
    private _urls: string[];
    private _index: string;
    
    constructor(index?: string){
        this._paginasIndexadas = [];
        this._urls = [
            'https://meidesu.github.io/movies-pages/interestelar.html',
            'https://meidesu.github.io/movies-pages/mochileiro.html',
            'https://meidesu.github.io/movies-pages/matrix.html',
            'https://meidesu.github.io/movies-pages/duna.html',
            'https://meidesu.github.io/movies-pages/blade_runner.html'
        ];

        this._index = index || 'https://meidesu.github.io/movies-pages/interestelar.html';
    }

    public async _iniciarIndexacao(): Promise<void>{
        await this.indexar(this._index);
        console.log('Indexação concluída');
        
    }

    public async indexar(url: string): Promise<void>{
        if(this._indexado(url)){
            // throw new Error('URL já indexada');
            console.log('URL já indexada');
            return;
        }       

        // Realizar a requisição GET para a URL especificada
        
        const response = await axios.get(url);
        
        // Extrair os dados da resposta
        const data: string = response.data;
        
        // Carregar o HTML da resposta usando cheerio
        const $ = load(data);
        
        // Obter o título da página, porem eu só quero duas palavras do título separadas por _ (underline)  
        const titulo = $('title').text();
        
        console.log(`Título: ${titulo}`);
        
        // Obter tags <a> 
        const tagsA = $('a');
        
        // Links de cada página
        const links: string[] = [];
        
        // Adicionar os links ao array de links
        for ( let tag of tagsA){
            const href = $(tag).attr("href");

            if(href){

                links.push(href);
            }
        }

        this._paginasIndexadas.push(new Pagina(titulo, url, data, links));
        
        this._salvarArquivo(titulo, data);

        for (let link of links){
            if(this._indexado(link)){
                
                continue;
            }

            await this.indexar(link);
        }        
    }

    private _salvarArquivo(titulo: string, data: string) {
        let _nomeArquivo: string = titulo.split(' ').slice(0, 2).join('_');
        
        try{
            fs.writeFileSync(`../Pages/${_nomeArquivo}.html`, data);
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

async function main(){
    // const indexador = new Indexador();
    
    // await indexador.indexar('https://meidesu.github.io/movies-pages/interestelar.html');
    // await indexador.indexar('https://meidesu.github.io/movies-pages/mochileiro.html');
    // await indexador.indexar('https://meidesu.github.io/movies-pages/matrix.html');
    // await indexador.indexar('https://meidesu.github.io/movies-pages/duna.html');
    // await indexador.indexar('https://meidesu.github.io/movies-pages/blade_runner.html');

}
// crie testes para 5 site

main();
