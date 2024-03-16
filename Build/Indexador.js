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
exports.Indexador = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const fs_1 = __importDefault(require("fs"));
const Pagina_1 = require("./Pagina");
class Indexador {
    constructor() {
        this._paginasIndexadas = [];
        this._urls = [
            'https://meidesu.github.io/movies-pages/interestelar.html',
            'https://meidesu.github.io/movies-pages/mochileiro.html',
            'https://meidesu.github.io/movies-pages/matrix.html',
            'https://meidesu.github.io/movies-pages/duna.html',
            'https://meidesu.github.io/movies-pages/blade_runner.html'
        ];
        this._iniciarIndexacao();
    }
    _iniciarIndexacao() {
        for (let url of this._urls) {
            this.indexar(url);
        }
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
                    this._paginasIndexadas.push(new Pagina_1.Pagina(url, data));
                }
                this._salvarArquivo(titulo, data);
                console.log('Título:', titulo);
            }
            catch (error) {
                // Tratar erros caso a requisição falhe
                console.error('Ocorreu um erro ao indexar');
            }
            //sei la
        });
    }
    _salvarArquivo(titulo, data) {
        let _nomeArquivo = titulo.split(' ').slice(0, 2).join('_');
        try {
            fs_1.default.writeFileSync(`../Pages/${_nomeArquivo}.html`, data);
            //Pages
        }
        catch (error) {
            // console.error('Erro ao salvar o arquivo');
            console.log(error);
        }
    }
    // Metodo que verifica se a URL já foi indexada
    verificarIndexacao(url) {
        for (let pagina of this._paginasIndexadas) {
            if (pagina.url === url) {
                return true;
            }
        }
        return false;
    }
    get paginasIndexadas() {
        return this._paginasIndexadas;
    }
}
exports.Indexador = Indexador;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const indexador = new Indexador();
        // await indexador.indexar('https://meidesu.github.io/movies-pages/interestelar.html');
        // await indexador.indexar('https://meidesu.github.io/movies-pages/mochileiro.html');
        // await indexador.indexar('https://meidesu.github.io/movies-pages/matrix.html');
        // await indexador.indexar('https://meidesu.github.io/movies-pages/duna.html');
        // await indexador.indexar('https://meidesu.github.io/movies-pages/blade_runner.html');
    });
}
// crie testes para 5 sites
main();
