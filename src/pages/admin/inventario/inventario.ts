import { Component, OnInit } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';

@Component({
  selector: 'page-inventario',
  templateUrl: 'inventario.html'
})
export class InventarioPage implements OnInit{
  
  constructor() { 
    console.log('InventarioPage constructor');
   }
   ngOnInit(){
     console.log('InventarioPage init');
   }
///////////////////////////////////////////////////////////////////  
  
}






