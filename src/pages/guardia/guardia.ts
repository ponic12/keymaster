import { Component, OnInit } from '@angular/core';
import { NavController, Platform, IonicPage } from 'ionic-angular';

import { RegistracionPage } from './registracion/registracion';
import { ListadoPage } from './listado/listado';

@IonicPage()
@Component({
  selector: 'page-guardia',
  templateUrl: 'guardia.html'
})
export class GuardiaPage implements OnInit {
  tabs1 = ListadoPage;
  tabs2 = RegistracionPage;

  constructor() {
    console.log('GuardiaPage constructor');
  }
  ngOnInit() {
    console.log('GuardiaPage init');
  }
}






