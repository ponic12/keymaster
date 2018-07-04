import { Component, OnInit } from '@angular/core';

import { ApplicationService, GlobalService } from 'fwk-services'
import { FirebaseService } from '../../../shared/services/firebase.service';
import { Registro } from '../../../shared/entities/registro';
import { Llave } from '../../../shared/entities/llave';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html'
})
export class HistoricoPage implements OnInit {
  registros$: Observable<Registro[]>;

  criteria:string;
  private sdEmpReg:string = 'desc';
  private sdEmpDev:string = 'desc';
  private sdLlave:string = 'desc';

  constructor(
    private globalSrv: GlobalService,
    private fs: FirebaseService) {
    console.log('HistoricoPage constructor');
  }
  ngOnInit() {
    console.log('HistoricoPage init');
    this.registros$ = this.fs.getRegistrosByFecha(new Date().getTime(), 'hora_reg', 'desc');
    //this.histList = this.globalSrv.listadoDiario;
  }

  sortByLlave(){
    this.sdLlave = this.toggleSortDir(this.sdLlave);
    this.registros$ = this.fs.getRegistrosByFecha(new Date().getTime(), 'llave',this.sdLlave);
  }
  sortByEmpReg(){
    this.sdEmpReg = this.toggleSortDir(this.sdEmpReg);
    this.registros$ = this.fs.getRegistrosByFecha(new Date().getTime(), 'emp_reg',this.sdEmpReg);
  }
  sortByEmpDev(){
    this.sdEmpDev = this.toggleSortDir(this.sdEmpDev);
    this.registros$ = this.fs.getRegistrosByFecha(new Date().getTime(), 'emp_dev',this.sdEmpDev);
  }


  ///////////////////////////////////////////////////////////////////  
  private toggleSortDir(sd){
    if (sd == 'desc') sd = 'asc'
    else sd = 'desc';
    return sd;
  }

}






