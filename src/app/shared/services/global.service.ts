import { Injectable } from '@angular/core';;
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { StorageService } from './storage.service';

@Injectable()
export class GlobalService {
    //private URL:string = "http://dwin0404/apiproxy/api/";
    private URL:string = "http://190.225.183.34:8080/apiproxy/api/";

    private usr = new BehaviorSubject<any>({});
    user = this.usr.asObservable();
    changeUser(msg: any) {
        this.usr.next(msg);
        this.storageSrv.set('user', msg);
    }

    // SAF
    private safCounter = new BehaviorSubject<any>(0);
    safOpsCounter = this.safCounter.asObservable();
    changeSafCounter(msg: any) {
        this.safCounter.next(msg);
        this.storageSrv.set('safOpsCounter', msg);
    }
    private safLst = new BehaviorSubject<any>([]);
    safList = this.safLst.asObservable();
    changeSaf(msg: any) {
        this.safLst.next(msg);
        this.storageSrv.set('safList', msg);
    }


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


    private abo = new BehaviorSubject<any>(123456789);
    abonado = this.abo.asObservable();
    changeAbonado(msg: any) {
        this.abo.next(msg);
        this.storageSrv.set('abonado', msg);
    }

    private url = new BehaviorSubject<any>("");
    urlBase = this.url.asObservable();
    changeUrlBase(msg: any) {
        this.url.next(msg);
        this.storageSrv.set('urlBase', msg);
    }


    private net = new BehaviorSubject<any>(true);
    networkStatus = this.net.asObservable();
    changeNetworkStatus(msg: any) {
        this.net.next(msg);
    }

    constructor( private storageSrv: StorageService) { 
        console.log("GlobalService constructor ");
        this.storageSrv.get('user').then(x => this.usr.next(x) );

        this.storageSrv.get('safCounter').then(x =>  (x)? this.safCounter.next(x): this.safCounter.next(0));
        this.storageSrv.get('safList').then(x =>  (x)? this.safLst.next(x): this.safLst.next([]));

        this.storageSrv.get('alertsCounter').then(x =>  (x)? this.alCounter.next(x): this.alCounter.next(0));
        this.storageSrv.get('alertsList').then(x =>  (x)? this.alList.next(x): this.alList.next([]));

        this.storageSrv.get('networkStatus').then(x =>  (x)? this.net.next(x): this.net.next(true));
        this.storageSrv.get('abonado').then(x =>  (x)? this.abo.next(x): this.abo.next(123456789));
        this.storageSrv.get('urlBase').then(x =>  (x)? this.url.next(x): this.url.next(this.URL));
    }
}