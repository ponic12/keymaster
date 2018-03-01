import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, IonicPage } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ApplicationService } from '../../shared/services/application.service';
import { FirebaseService } from '../../shared/services/firebase.service';
import { GlobalService } from '../../shared/services/global.service';

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html'
})
export class UsuarioPage implements OnInit {
  userInfo = { legajo: "U506713", nombre: "Pablo", apellido: "Massad", llave: "" };
  qrUser = null;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private appSrv: ApplicationService,
    private globalSrv: GlobalService,
    private alertCtrl: AlertController,
    private platform: Platform,
    private fs:FirebaseService
  ) {
    console.log('UsuarioPage constructor');
  }
  ngOnInit() {
    console.log('UsuarioPage init');
    //this.userInfo = this.usrSrv.getUser();
    this.userInfo.legajo = this.globalSrv.userId;
    this.qrUser = JSON.stringify(this.userInfo);
  }

  confirm() { // ONLY OFFLINE
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
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







