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

  confirm() { // ONLY OFFLINE
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        var obj = JSON.parse(barcodeData.text);
        if (obj) {
          this.userInfo.llave = (this.userInfo.llave == obj.llave) ? obj.llave : '';
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







