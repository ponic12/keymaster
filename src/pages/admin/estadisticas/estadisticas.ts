import { Component, OnInit } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';

@Component({
  selector: 'page-estadisticas',
  templateUrl: 'estadisticas.html'
})
export class EstadisticasPage implements OnInit{
  
  constructor() { 
    console.log('EstadisticasPage constructor');
   }
  ngOnInit(){
    console.log('EstadisticasPage init');
  }
///////////////////////////////////////////////////////////////////  
  
}






