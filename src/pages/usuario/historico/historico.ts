import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';


@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html'
})
export class HistoricoPage implements OnInit {
  histList:any;

  constructor() {
    console.log('HistoricoPage constructor');
  }

  ngOnInit() {
    console.log('HistoricoPage init');
    // Get Historico x servicio
  }
  ///////////////////////////////////////////////////////////////////  


}






