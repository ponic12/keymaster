import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ApplicationService } from '../../../shared/services/application.service';
import { GlobalService } from '../../../shared/services/global.service';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { Registro } from '../../../shared/entities/registro';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html'
})
export class ListadoPage implements OnInit {
  registros$: Observable<Registro[]>;
  criteria:string;
  private sdEmp:string = 'desc';
  private sdLlave:string = 'desc';

  constructor(
    public navCtrl: NavController,
    private globalSrv: GlobalService,
    private fs: FirebaseService) {
    console.log('ListadoPage constructor');
  }
  ngOnInit() {
    console.log('ListadoPage init');
    this.registros$ = this.fs.getRegistrosByFecha(new Date().getTime(), 'hora_reg', 'desc');
    //this.histList = this.globalSrv.listadoDiario;
  }

  sortByLlave(){
    this.sdLlave = this.toggleSortDir(this.sdLlave);
    this.registros$ = this.fs.getRegistrosByFecha(new Date().getTime(), 'llave',this.sdLlave);
  }
  sortByEmp(){
    this.sdEmp = this.toggleSortDir(this.sdEmp);
    this.registros$ = this.fs.getRegistrosByFecha(new Date().getTime(), 'empleado',this.sdEmp);
  }


  ///////////////////////////////////////////////////////////////////  
  private toggleSortDir(sd){
    if (sd == 'desc') sd = 'asc'
    else sd = 'desc';
    return sd;
  }

}






