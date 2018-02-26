import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, IonicPage } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ApplicationService } from '../../app/shared/services/application.service';
// import { IdentificacionPage } from './identificacion/identificacion';
// import { TransferenciaPage } from './transferencia/transferencia';
// import { HistoricoPage } from './historico/historico';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html'
})
export class UsuarioPage implements OnInit {
  // tabs1 = IdentificacionPage;
  // tabs2 = TransferenciaPage;
  // tabs3 = HistoricoPage;

  userInfo = { legajo: "U506713", nombre: "Pablo Alberto", apellido: "Massad", llave: "303" };
  hasKey:boolean = false;
  qrUser = null;
  qrKey = null;

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
    this.qrUser = this.generateQR(this.userInfo);
  }
  ///////////////////////////////////////////////////////////////////  

  regKey() {
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        var obj:any = barcodeData.text;
        this.confirmReg(obj.llave);
      })
    } else {
      this.appSrv.message('Error', 'QR no disponible en web');
      console.log('Scan of QR not supported in browser....');
    }
  }

  private confirmReg(llave:string) {
    let alert = this.alertCtrl.create({
      title: 'Confirmacion',
      message: 'Esta seguro de registrar esta llave?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancela registracion');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.userInfo.llave = llave;
            this.qrUser = this.generateQR(this.userInfo);
            //this.qrKey = this.generateQR(llave);
            this.hasKey = true;
            console.log('Registro OK');
          }
        }
      ]
    });
    alert.present();
  }

  // tranferKey() {
  //   if (this.platform.is('cordova')) {
  //     this.barcodeScanner.scan().then(barcodeData => {
  //       this.scannedCode = barcodeData.text;
  //       this.userInfo.llave = this.scannedCode.key;
  //       this.generateQR(this.userInfo);
  //       this.hasKey = true;
  //     })
  //   } else {
  //     this.appSrv.message('Error', 'QR no disponible en web');
  //     console.log('Scan of QR not supported in browser....');
  //   }
  // }

  devKey() {
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        var obj:any = barcodeData.text;
        if (obj.llave == this.userInfo.llave){
          this.userInfo.llave = null;
          this.hasKey = false;
        }
      })
    } else {
      this.appSrv.message('Error', 'QR no disponible en web');
      console.log('Scan of QR not supported in browser....');
    }
  }

  private generateQR(json) {
    var res = JSON.stringify(json);
    return res;
  }
}






