import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit() {
    let dia = 0;
    let mapa = {
      'v' : 5,
      'h' : 5
    };
    let aeroporto = {
      'A' : 5,
      'B' : 15,
      'C' : 24
    };
    console.log(mapa);
    console.log(dia);
    console.log(aeroporto);
  }
}
