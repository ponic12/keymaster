import { Injectable } from '@angular/core';;
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Empleado } from '../entities/empleado';
import { StorageService } from './storage.service';

@Injectable()
export class GlobalService {

    listadoDiario = [
        {reg:'08:00',dev:'', key:'332', legajo:'u522321' },
        {reg:'08:20',dev:'14:11', key:'201', legajo:'u502113' },
        {reg:'08:30',dev:'', key:'205', legajo:'u512321' },
        {reg:'08:45',dev:'', key:'111', legajo:'u521326' },
        {reg:'09:00',dev:'', key:'105', legajo:'u524999' },
        {reg:'09:10',dev:'10:30', key:'200', legajo:'u5242321' },
        {reg:'09:15',dev:'12:20', key:'202', legajo:'u5242321' }
      ];


    user:Empleado;

    // ALERTS
    private alCounter = new BehaviorSubject<any>(0);
    alertsCounter = this.alCounter.asObservable();
    changeAlertCounter(msg: any) {
        this.alCounter.next(msg);
        this.storageSrv.set('alertsCounter', msg);
    }
    private alList = new BehaviorSubject<any>([]);
    alertsList = this.alList.asObservable();
    changeAlert(msg: any) {
        this.alList.next(msg);
        this.storageSrv.set('alertsList', msg);
    }


    private net = new BehaviorSubject<any>(true);
    networkStatus = this.net.asObservable();
    changeNetworkStatus(msg: any) {
        this.net.next(msg);
    }

    constructor( private storageSrv: StorageService) { 
        console.log("GlobalService constructor ");
        this.user = { legajo: "U506713", nombre: "Nicola", apellido: "Tesla", mail:"", llave: "", idReg:"" };

        this.storageSrv.get('alertsCounter').then(x =>  (x)? this.alCounter.next(x): this.alCounter.next(0));
        this.storageSrv.get('alertsList').then(x =>  (x)? this.alList.next(x): this.alList.next([]));

        this.storageSrv.get('networkStatus').then(x =>  (x)? this.net.next(x): this.net.next(true));
    }
}