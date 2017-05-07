import { Aeroporto } from './aeroporto';
export class Mapa {
    private matriz: Boolean[];
    private coluna: number;
    private linha: number;
    private aeroporto: Aeroporto;
    private dia: number;
    private tamanhoMax: number;
    private vulcao: number;
    constructor(coluna: number, linha: number) {
        if (coluna <= 0 || linha <= 0) {
            throw new TypeError('Matriz deve ter linhas e colunas superior a 0');
        }
        this.coluna = coluna;
        this.linha = linha;
        this.tamanhoMax = (this.coluna * this.linha);
        this.aeroporto = new Aeroporto();
        this.matriz = [];
        this.dia = 0;
        this.vulcao = null;
    }

    public carregaAeroporto(posicoes: Number[]) {
        if (this.matriz.length === 0) {
            throw new TypeError('O mapa nao foi carregado ainda');
        }
        if (posicoes.length === 0) {
            throw new TypeError('Posicao de Aeroporto nao identificada');
        }
        posicoes.forEach((iten: number) => {
            iten = iten - 1;
            if (this.tamanhoMax < iten || iten < 0) {
                throw new TypeError('Posicao de Aeroporto maior que o tamanho do mapa');
            }
            if (typeof this.vulcao === 'number' && this.vulcao === iten ) {
                throw new TypeError('Nao pode ter um aeroporto sobre um vulcao.. haha');
            }
            this.aeroporto.add(iten);
        });
    }
    /**
     *   montando estrutura de matriz, referente ao mapa.
     *   Nao esta definido como LazyLoad.!
     */
    public carregandoMapa(): void {
        for (let i = 0; i <= this.tamanhoMax - 1; i++) {
            this.matriz.push(false);
        }
    }
    /**
     *   Carregar posicao do Vulcao
     */
    public carregarVulcao(posicao: number): void {
        if (this.matriz.length === 0) {
            throw new TypeError('O mapa nao foi carregado ainda');
        }
        if (posicao === 0 || posicao > this.tamanhoMax) {
            throw new TypeError('posicao nao encontrada, deve ser entre 1 ate ' + this.tamanhoMax);
        }
        posicao = (posicao - 1);
        console.log(this.matriz);
        if (typeof this.matriz[posicao] === 'undefined') {
            throw new TypeError('posicao nao encontrada no mapa para carregar o Vulcao');
        }
        if (this.aeroporto.getAll().length > 0) {
            this.aeroporto.getAll().forEach((iten: number) => {
                iten = iten - 1;
                if (posicao === iten ) {
                    throw new TypeError('Nao pode ter um aeroporto sobre um vulcao.. haha');
                }
            });
        }
        this.vulcao = posicao;
        this.setNuvem(posicao);
    }
    public novoDia(): void {
        /*
            Analisando se mapa foi iniciado
         */
        if (this.matriz.length === 0) {
            throw new TypeError('Carregar metodo "carregandoMapa" ou matriz nao contem valores corretos, ex: 5x5');
        }
        /*
            verificar se vulcao existe
         */
        if (this.vulcao === null) {
            throw new TypeError('Deve setar o valor da posicao do Vulcao');
        }
        /*
         iniciando novo dias
         */
        this.dia++;
        /*
         setando nuvens em estrutura
         */
        this.setNuvem(this.vulcao);
        let i = 0;
        let loadCache: object = [];
        this.matriz.forEach((iten) => {
            if (iten && !this.contain(loadCache, i)) {
                loadCache = this.setValoresMapeados(i, loadCache);
            }
            i++;
        });
        /*
         verificar se o primeiro aeroporto foi coberto
         */
        if (this.aeroportosCompleto() > 0 && typeof this.aeroporto.getPrimeiroDia() === 'undefined') {
           this.aeroporto.setPrimeiroDia(this.dia);
        }
    }

    /**
     * setando valores da adjacencia
     */
    private setValoresMapeados(posicaoReflextion: number, loadCache: any): object {
        /*
         verificar posicao anterior
         */
        if (!this.matriz[posicaoReflextion - 1]) {
            this.setNuvem(
                posicaoReflextion - 1
            );
            loadCache.push(posicaoReflextion - 1);
            this.aeroporto.isAeroporto(posicaoReflextion - 1);
        }


        /*
         verificar proxima posicao
         */
        if (!this.matriz[posicaoReflextion + 1]) {
            this.setNuvem(
                posicaoReflextion + 1
            );
            loadCache.push(posicaoReflextion + 1);
            this.aeroporto.isAeroporto(posicaoReflextion + 1);
        }


        /*
         verificar posicao a baixo
         */
        if (!this.matriz[posicaoReflextion + 1 + (this.linha - 1)]) {
            this.setNuvem(
                posicaoReflextion + 1 + (this.linha - 1)
            );
            loadCache.push(posicaoReflextion + 1 + (this.linha - 1));
            this.aeroporto.isAeroporto(posicaoReflextion + 1 + (this.linha - 1));
        }


        /*
         verificar posicao a cima
         */
        if (!this.matriz[posicaoReflextion - 1 - (this.linha - 1)]) {
            this.setNuvem(
                posicaoReflextion - 1 - (this.linha - 1)
            );
            loadCache.push(posicaoReflextion - 1 - (this.linha - 1));
            this.aeroporto.isAeroporto(posicaoReflextion - 1 - (this.linha - 1));
        }
        return loadCache;
    }

    /**
     * setando nova nuvem
     * @param posicao
     */
    private setNuvem(posicao: number) {
        if (typeof this.matriz[posicao] === 'boolean') {
            this.matriz[posicao] = true;
        }
    }

    /**
     * verifica se existe valor em array
     * @param object
     * @param posicao
     * @returns {boolean}
     */
    private contain(object: any, posicao: number): boolean {
        for (let exist of object) {
            if (exist === posicao) {
                return true;
            }
        }
        return false;
    }

    /**
     * verifica todos os niveis do mapa se estao setados
     * @returns {boolean}
     */
    public completo() {
        return this.aeroporto.todosAeroportosCoberto();
    }

    /**
     * verifica todos os aeroportos estao cobertos
     * Quando todos estiverem cobertos, ira retornar o valor de dias que
     * isto ocorreu, se caso contrario retornara 0
     * @returns {number}
     */
    public aeroportosCompleto() {
        let i = 0;
        let aeroportosCobertos = 0;
        for (let single of this.matriz) {
            for (let aeroporto of this.aeroporto.getAll()) {
                if (aeroporto === i && single) {
                    aeroportosCobertos++;
                }
            }
            i++;
        }
        // console.log(this.aeroporto.getAll().length);
        return aeroportosCobertos;
    }

    /**
     * @returns {number}
     */
    public getDia() {
        return this.dia;
    }

    /**
     * retorna o resultado
     */
    public resultado(): object {
        let data;
        let completo = false;
        while (!completo) {
            this.novoDia();
            if (this.completo()) {
                data = {
                    'diaTodos' : this.dia,
                    'diaPrimeiro' : this.aeroporto.getPrimeiroDia(),
                };
                completo = true;
            }
        }
        return data;
    }
    public getLinha() { return this.linha; }
    public getColuna() { return this.coluna; }
}
