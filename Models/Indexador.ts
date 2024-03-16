import axios from 'axios';
import cheerio, { load } from 'cheerio';
import fs from 'fs';

class Indexador{
    private _paginasIndexadas: string[];
    
    constructor(){
        this._paginasIndexadas = [];
    }

    public async indexar(url: string): Promise<void>{
        try {
            // Realizar a requisição GET para a URL especificada
            const response = await axios.get(url);
    
            // Extrair os dados da resposta
            const data: string = response.data;
    
            // Carregar o HTML da resposta usando cheerio
            const $ = load(response.data);

            // Obter o título da página, porem eu só quero duas palavras do título separadas por _ (underline)  
            const titulo = $('title').text();

            // Adicionar a URL indexada ao array de páginas indexadas, porem não pode ser repetido
            if(!this.verificarIndexacao(url)){
                this._paginasIndexadas.push(url);
            }

            this._salvarArquivo(titulo, data);

            // BOTEO PRA ELE PODER EDITAR NO TERMINAL
            console.log('Título:', titulo);

        } catch (error) {
            // Tratar erros caso a requisição falhe
            console.error('Ocorreu um erro ao indexar');
        }
    //sei la
    }

    private _salvarArquivo(titulo: string, data: string) {
        let _nomeArquivo: string = titulo.split(' ').slice(0, 2).join('_');
        
        try{
            fs.writeFileSync(`../Pages/${_nomeArquivo}.html`, data);
            //Pages
        } catch (error) {
            // console.error('Erro ao salvar o arquivo');
            console.log(error);
            
        }

    }

    // Metodo que verifica se a URL já foi indexada
    public verificarIndexacao(url: string): boolean{
        return this._paginasIndexadas.includes(url);
    }



    public get indice(): string[]{
        return this._paginasIndexadas;
    }    
}

async function main(){
    const indexador = new Indexador();
    
    await indexador.indexar('https://meidesu.github.io/movies-pages/interestelar.html');
    await indexador.indexar('https://meidesu.github.io/movies-pages/mochileiro.html');
    await indexador.indexar('https://meidesu.github.io/movies-pages/matrix.html');
    await indexador.indexar('https://meidesu.github.io/movies-pages/duna.html');
    await indexador.indexar('https://meidesu.github.io/movies-pages/blade_runner.html');

}
// crie testes para 5 sites

main();
