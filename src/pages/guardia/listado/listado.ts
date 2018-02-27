import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ApplicationService } from '../../../app/shared/services/application.service';
import { GlobalService } from '../../../app/shared/services/global.service';

@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html'
})
export class ListadoPage implements OnInit {
  histList = [];

  constructor(
    public navCtrl: NavController,
    private globalSrv: GlobalService) {
    console.log('ListadoPage constructor');
  }
  ngOnInit() {
    console.log('ListadoPage init');
    this.histList = this.globalSrv.listadoDiario;
  }
  ///////////////////////////////////////////////////////////////////  


}






