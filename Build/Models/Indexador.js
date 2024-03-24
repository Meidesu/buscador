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
//bibliotecas utilizadas para o projeto
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = require("cheerio");
const fs_1 = __importDefault(require("fs"));
const Pagina_1 = require("./Pagina");
//classe  indexador
class Indexador {
    constructor(index, profMax) {
        this._paginasIndexadas = [];
        this._index = index || 'https://meidesu.github.io/movies-pages/interestelar.html';
        this._ProfMax = profMax || 2;
    }
    _iniciarIndexacao() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.indexar(this._index);
            console.log('Indexação concluída');
        });
    }
    indexar(url, prof = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            // verifica se a url ja foi indexada
            let profAtual = prof;
            if (this._indexado(url)) {
                console.log('URL já indexada');
                return;
            }
            // Verifica se o link pertence a mesma página
            if (!url.startsWith(this._index)) {
                console.log('Link não pertence a mesma página');
                return;
            }
            // faz a requisição
            const response = yield axios_1.default.get(url);
            // extrai o conteudo da pagina
            const conteudo = response.data;
            // carrega o conteudo html
            const $ = (0, cheerio_1.load)(conteudo);
            // obtem o titulo da pagina
            const titulo = $('title').text();
            // extrai a data da pagina
            const emElement = $('p').text();
            const regex = /\d{2}\/\d{2}\/\d{4}/;
            const match = emElement.match(regex);
            const dataPag = match ? match[0] : null;
            // verifica a data da pagina(se ela é válida)
            let data;
            if (dataPag) {
                const [dia, mes, ano] = dataPag.split('/').map(Number);
                data = new Date(ano, mes - 1, dia);
            }
            else {
                data = null;
            }
            // obtem as paginas da tag <a>
            const tagsA = $('a');
            const links = [];
            for (let tag of tagsA) {
                const href = $(tag).attr("href");
                if (href) {
                    links.push(href);
                }
            }
            try {
                this._salvarArquivo(titulo, conteudo);
            }
            catch (e) {
                console.log(e.message);
            }
            console.log(`Indexando ${titulo}`);
            // cria uma instancia e add ela na lista de paginas indexadas
            this._paginasIndexadas.push(new Pagina_1.Pagina(titulo, url, conteudo, data, links));
            // Verifica se a página atual está indexada
            if (this._indexado(url) && profAtual < this._ProfMax) {
                // Limita a indexação apenas aos links da página
                for (let link of links) {
                    // console.log(`Indexando ${link}`);
                    yield this.indexar(link, profAtual + 1);
                }
            }
        });
    }
    _salvarArquivo(titulo, conteudo) {
        let _nomeArquivo = titulo.split(' ').slice(0, 4).join('_');
        try {
            console.log(`Salvando arquivo ${_nomeArquivo}`);
            fs_1.default.writeFileSync(`../Pages/${_nomeArquivo}.html`, conteudo);
        }
        catch (error) {
            throw new Error('Erro ao salvar o arquivo');
        }
    }
    // Metodo que verifica se a URL já foi indexada
    _indexado(url) {
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
