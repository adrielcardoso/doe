import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Mapa } from './mapa';

describe('Mapa', () => {
  const html = '<my-home></my-home>';

  beforeEach(() => {
    TestBed.configureTestingModule({declarations: [Mapa, TestComponent]});
    TestBed.overrideComponent(TestComponent, { set: { template: html }});
  });

  it('definindo estrutura do Mapa, deve conter erro porque nao pode ser menor que zero nenhum dos parametros', () => {
    expect(function () {
      new Mapa(-5, -1);
    }).toThrow(new TypeError('Matriz deve ter linhas e colunas superior a 0'));
  });

  it('definindo estrutura de 5x5', () => {
    expect(new Mapa(5, 5)).toEqual(jasmine.any(Object));
  });

  it('setando posicao de aeroporto, deve retornar: Posicao de Aeroporto nao identificada', () => {
    expect( function(){
      let mapa = new Mapa(5, 5);
      mapa.carregaAeroporto([]);
    }).toThrow(new TypeError('Posicao de Aeroporto nao identificada'));
  });

  it('setando posicao que nao existe na matriz, para aeroporto', () => {
    expect( function(){
      let mapa = new Mapa(5, 5);
      mapa.carregaAeroporto([58]);
    }).toThrow(new TypeError('Posicao de Aeroporto maior que o tamanho do mapa'));
  });
});

@Component({selector: 'my-test', template: ''})
class TestComponent { }
