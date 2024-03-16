"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
class Indexador {
    constructor() {
        this._paginasIndexadas = [];
    }
    indexar(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Realizar a requisição GET para a URL especificada
                const response = yield axios_1.default.get(url);
                // Extrair os dados da resposta
                const data = response.data;
                // Carregar o HTML da resposta usando cheerio
                const $ = (0, cheerio_1.load)(response.data);
                // Obter o título da página, porem eu só quero duas palavras do título separadas por _ (underline)  
                const titulo = $('title').text();
                // Adicionar a URL indexada ao array de páginas indexadas, porem não pode ser repetido
                if (!this.verificarIndexacao(url)) {
                    this._paginasIndexadas.push(url);
                }
                this._salvarArquivo(titulo, data);
                // Exemplo de como utilizar o título (imprimir no console)
                console.log('Título:', titulo);
            }
            catch (error) {
                // Tratar erros caso a requisição falhe
                console.error('Ocorreu um erro ao indexar');
            }
        });
    }
    _salvarArquivo(titulo, data) {
    }
    // Metodo que verifica se a URL já foi indexada
    verificarIndexacao(url) {
        return this._paginasIndexadas.includes(url);
    }
    get indice() {
        return this._paginasIndexadas;
    }
}
// async function main(){
//     const indexador = new Indexador();
//     await indexador.indexar('https://meidesu.github.io/movies-pages/interestelar.html');
//     await indexador.indexar('https://meidesu.github.io/movies-pages/mochileiro.html');
//     await indexador.indexar('https://meidesu.github.io/movies-pages/matrix.html');
//     await indexador.indexar('https://meidesu.github.io/movies-pages/duna.html');
//     await indexador.indexar('https://meidesu.github.io/movies-pages/blade_runner.html');
// }
// // crie testes para 5 sites
// main();
