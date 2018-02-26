import { Component, OnInit } from '@angular/core';
import { NavController, Platform, IonicPage } from 'ionic-angular';
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
  hasKey:boolean = false;
  userInfo = { legajo: "U506713", nombre: "Pablo Alberto", apellido: "Massad", llave: "303" };
  qrCode = null;
  scannedCode = null;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private appSrv: ApplicationService,
    private platform: Platform
  ) {
    console.log('UsuarioPage constructor');
  }
  ngOnInit() {
    console.log('UsuarioPage init');
    this.generateQR(this.userInfo);
  }
  ///////////////////////////////////////////////////////////////////  

  regKey() {
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
        this.userInfo.llave = this.scannedCode.key;
        this.generateQR(this.userInfo);
        this.hasKey = true;
      })
    } else {
      this.appSrv.message('Error', 'QR no disponible en web');
      console.log('Scan of QR not supported in browser....');
    }
  }

  tranferKey() {
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
        this.userInfo.llave = this.scannedCode.key;
        this.generateQR(this.userInfo);
        this.hasKey = true;
      })
    } else {
      this.appSrv.message('Error', 'QR no disponible en web');
      console.log('Scan of QR not supported in browser....');
    }
  }

  devKey() {
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        this.scannedCode = barcodeData.text;
        this.userInfo.llave = this.scannedCode.key;
        this.generateQR(this.userInfo);
        this.hasKey = true;
      })
    } else {
      this.appSrv.message('Error', 'QR no disponible en web');
      console.log('Scan of QR not supported in browser....');
    }
  }

  private generateQR(msg) {
    this.qrCode = JSON.stringify(msg);
  }
}






