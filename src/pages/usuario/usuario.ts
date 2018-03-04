import { Component, OnInit, NgZone } from '@angular/core';
import { Platform, AlertController, IonicPage } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ApplicationService } from '../../shared/services/application.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { GlobalService } from '../../shared/services/global.service';
import { Registro } from '../../shared/entities/registro';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html'
})
export class UsuarioPage implements OnInit {
  reg: Registro;
  userInfo = { legajo: "U506713", nombre: "Pablo", apellido: "Massad", llave: "" };
  qrUser = null;
  networkStatus:boolean;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private appSrv: ApplicationService,
    private globalSrv: GlobalService,
    private alertCtrl: AlertController,
    private platform: Platform,
    private fs:FirebaseService,
    private zone:NgZone
  ) {
    console.log('UsuarioPage constructor');
  }
  ngOnInit() {
    console.log('UsuarioPage init');
    this.userInfo.legajo = this.globalSrv.userId;
    this.qrUser = JSON.stringify(this.userInfo);
    this.globalSrv.networkStatus.subscribe(x => {
      this.zone.run(() => {
        this.networkStatus = x;
      });
      console.log('networkStatus: ', this.networkStatus);
    });
  }
  transfer(){
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        if (barcodeData.text == '') return;
        var obj = JSON.parse(barcodeData.text);
        if (obj) {
          let alert = this.alertCtrl.create({
            title: 'Transferencia',
            message: '¿Confirma transferir llave '+obj.llave + ' al empleado '+obj.legajo+'?',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                  console.log('Cancela transferencia');
                }
              },
              {
                text: 'Aceptar',
                handler: () => {
                  this.fs.transfer(this.userInfo, obj);
                  console.log('Transferencia de llave');
                }
              }
            ]
          });
          alert.present();         
        }
        else
          this.appSrv.message('Error', 'No se dectecto codigo QR');
      })
    } else {
      this.appSrv.message('Error', 'QR no disponible en web');
      console.log('Scan of QR not supported in browser....');
    }    
  }
  confirm() { // ONLY OFFLINE
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        if (barcodeData.text == '') return;
        var obj = JSON.parse(barcodeData.text);
        if (obj) {
          if (this.userInfo.llave == '')
            this.userInfo.llave = obj.llave;
          else{
            if (this.userInfo.llave == obj.llave)
              this.userInfo.llave = '';
          }
          this.qrUser = JSON.stringify(this.userInfo);          
        }
        else
          this.appSrv.message('Error', 'No se dectecto codigo QR');
      })
    } else {
      this.appSrv.message('Error', 'QR no disponible en web');
      console.log('Scan of QR not supported in browser....');
    }
  }
}







