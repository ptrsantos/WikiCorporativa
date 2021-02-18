export abstract class FiltroBase {
    Validade: Date;

    // ehFiltroValido(): boolean {
    //     if (this.Validade) return this.Validade.getTime() > new Date().getTime();

    //     return false;
    // }

    definirValidadeFiltro() {
        this.Validade = new Date();
        this.Validade.setDate(this.Validade.getDate() + 1);
    }
}