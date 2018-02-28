import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ApplicationService } from '../../../app/shared/services/application.service';
import { GlobalService } from '../../../app/shared/services/global.service';
import { FirebaseService } from '../../../app/shared/services/firebase.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-listado',
  templateUrl: 'listado.html'
})
export class ListadoPage implements OnInit {
  registros$: Observable<any[]>;
  private sdEmp:string = 'desc';
  private sdKey:string = 'desc';

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
  ///////////////////////////////////////////////////////////////////  


}






