import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, IonicPage } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ApplicationService } from '../../app/shared/services/application.service';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html'
})
export class UsuarioPage implements OnInit {
  userInfo = { legajo: "U506713", nombre: "Pablo Alberto", apellido: "Massad", llave: "" };
  hasKey: boolean = false;
  qrUser = null;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private appSrv: ApplicationService,
    private alertCtrl: AlertController,
    private platform: Platform
  ) {
    console.log('UsuarioPage constructor');
  }
  ngOnInit() {
    console.log('UsuarioPage init');
    //this.userInfo = this.usrSrv.getUser();
    this.qrUser = JSON.stringify(this.userInfo);
  }

  regKey() { // ONLY OFFLINE
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        var obj = JSON.parse(barcodeData.text);
        if (obj) {
          this.userInfo = obj;
          this.qrUser = JSON.stringify(this.userInfo);
          this.hasKey = true;
          this.appSrv.message('Aviso', 'Llave ' + this.userInfo.llave + ' registrada!');
        }
        else
          this.appSrv.message('Error', 'No se dectecto codigo QR');
      })
    } else {
      this.appSrv.message('Error', 'QR no disponible en web');
      console.log('Scan of QR not supported in browser....');
    }
  }
  devKey() {  // ONLY OFFLINE
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        var obj = JSON.parse(barcodeData.text);
        if (obj) {
          if (obj.llave == this.userInfo.llave) {
            this.userInfo.llave = undefined;
            this.qrUser = JSON.stringify(this.userInfo);
            this.hasKey = false;
            this.appSrv.message('Aviso', 'Devolucion efectuada OK');
          }
        }
        else {
          this.appSrv.message('Error', 'No se detecto codigo QR!');
        }
      })
    } else {
      this.appSrv.message('Error', 'QR no disponible en web');
      console.log('Scan of QR not supported in browser....');
    }
  }

  // private confirmReg(llave:string) {
  //   let alert = this.alertCtrl.create({
  //     title: 'Confirmacion',
  //     message: 'Registra la llave: ' + llave + '?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancela registracion');
  //         }
  //       },
  //       {
  //         text: 'Aceptar',
  //         handler: () => {
  //           this.qrUser = JSON.stringify(this.userInfo);
  //           this.userInfo.llave = llave;
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

}






