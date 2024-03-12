class Buscador {
    private paginasIndexadas: { url: string, conteudo: string }[]

    constructor() {
        this.paginasIndexadas = []
    }

    adicionarPagina(url: string, conteudo: string): void {
        this.paginasIndexadas.push({ url, conteudo })
    }

    buscar(consulta: string): string[] {
        const resultados: string[] = []

       
        for (const pagina of this.paginasIndexadas) {
           
            if (pagina.conteudo.includes(consulta)) {
                resultados.push(pagina.url)
            }
        }

        return resultados
    }
}