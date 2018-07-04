import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { RegistracionPage } from './registracion/registracion';
import { ListadoPage } from './listado/listado';
import { HistoricoPage } from './historico/historico';

@IonicPage()
@Component({
  selector: 'page-guardia',
  templateUrl: 'guardia.html'
})
export class GuardiaPage implements OnInit {
  tabs1 = RegistracionPage;
  tabs2 = ListadoPage;
  tabs3 = HistoricoPage;

  constructor() {
    console.log('GuardiaPage constructor');
  }
  ngOnInit() {
    console.log('GuardiaPage init');
  }
}






