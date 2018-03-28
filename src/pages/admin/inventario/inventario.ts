import { Component, OnInit } from '@angular/core';

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






