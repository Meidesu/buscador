"use strict";
class Buscador {
    constructor() {
        this.paginasIndexadas = [];
    }
    adicionarPagina(url, conteudo) {
        this.paginasIndexadas.push({ url, conteudo });
    }
    buscar(consulta) {
        const resultados = [];
        for (const pagina of this.paginasIndexadas) {
            if (pagina.conteudo.includes(consulta)) {
                resultados.push(pagina.url);
            }
        }
        return resultados;
    }
}
