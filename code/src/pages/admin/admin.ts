import { Component, OnInit } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { InventarioPage } from './inventario/inventario';
import { EstadisticasPage } from './estadisticas/estadisticas';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html'
})
export class AdminPage implements OnInit {
  tabs1 = InventarioPage;
  tabs2 = EstadisticasPage;

  constructor() {
    console.log('AdminPage constructor');
  }
  ngOnInit() {
    console.log('AdminPage init');
  }
}






