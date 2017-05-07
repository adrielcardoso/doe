export class Aeroporto {
    private posicao: Number[];
    private primeiroDia: number;
    private aeroportoEncontrado: number;
    public add(posicao: Number): void {
        if (typeof this.posicao === 'undefined') {
            this.posicao = [];
        }
        this.posicao.push(posicao);
    }
    public addAll(posicoes: Number[]): void {
        this.posicao = posicoes;
    }
    public getAll() {
        return this.posicao;
    }
    public setPrimeiroDia(dia: number) {
        this.primeiroDia = dia;
    }
    public getPrimeiroDia(): number {
        return this.primeiroDia;
    }

    /**
     * verificar se posicao e um aeroporto
     * @param posicao
     * @returns {boolean}
     */
    public isAeroporto(posicao: number) {
        for (let single of this.getAll()) {
            if (single === posicao) {
                this.addAeroportoEncontrado();
                return true;
            }
        }
        return false;
    }

    /**
     * setando quantidade de aeroporto encontrado
     */
    public addAeroportoEncontrado() {
        if (typeof this.aeroportoEncontrado === 'undefined') {
            this.aeroportoEncontrado = 1;
        }else {
            this.aeroportoEncontrado++;
        }
    }

    /**
     * Uma vez todos os aeroportos cobertos, mapeamento completado
     * @returns {boolean}
     */
    public todosAeroportosCoberto() {
        if (typeof this.aeroportoEncontrado === 'number' &&
                this.aeroportoEncontrado === this.getAll().length) {
            return true;
        }
        return false;
    }
}
