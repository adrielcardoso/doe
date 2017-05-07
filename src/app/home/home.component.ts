import { Component, OnInit } from '@angular/core';
import { Mapa } from './entity/mapa';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    private mapa: Mapa;
    private data: object;

    constructor() {
      this.mapa = new Mapa(5, 5);
      this.mapa.carregandoMapa();
      this.mapa.carregaAeroporto([7, 13]);
      this.mapa.carregarVulcao(1);
    }

    ngOnInit() {
      /*
        a cada novo dia, sera registrado uma nova nuvensinha
        para cada nuvem, na horizontal e na vertical.
        ate completar a adjacência
       */
        this.data = this.mapa.resultado();
        console.log(this.data);
    }
}
