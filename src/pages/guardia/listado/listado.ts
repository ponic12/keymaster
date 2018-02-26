import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html'
})
export class ListadoPage implements OnInit {

  constructor(
    public navCtrl: NavController) {
    console.log('ListadoPage constructor');
  }
  ngOnInit() {
    console.log('ListadoPage init');
  }
  ///////////////////////////////////////////////////////////////////  


}






