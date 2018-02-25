import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//import { BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { IdentificacionPage } from './identificacion/identificacion';
import { TransferenciaPage } from './transferencia/transferencia';
import { HistoricoPage } from './historico/historico';

@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html'
})
export class UsuarioPage {
  tabs1 = IdentificacionPage;
  tabs2 = TransferenciaPage;
  tabs3 = HistoricoPage;



  qrData = null;
  createdCode = null;
  scannedCode = null;
  
      //     preferFrontCamera : true, // iOS and Android
      //     showFlipCameraButton : true, // iOS and Android
      //     showTorchButton : true, // iOS and Android
      //     torchOn: true, // Android, launch with the torch switched on (if available)
      //     saveHistory: true, // Android, save scan history (default false)
      //     prompt : "Place a barcode inside the scan area", // Android
      //     resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      //     formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      //     orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      //     disableAnimations : true, // iOS
      //     disableSuccessBeep: false // iOS and Android
      
  
  constructor(private barcodeScanner: BarcodeScanner) {  }
  
///////////////////////////////////////////////////////////////////  
  createCode(){
    this.createdCode = this.qrData;
    // if (this.platform.is('cordova')) {
    //   this.createdCode = this.qrData;
    // } else {
    //   console.log('Creation QR not supported in browser....');
    // }
  }
  scanCode(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    })
    // if (this.platform.is('cordova')) {
    //   this.barcodeScanner.scan().then(barcodeData => {
    //     this.scannedCode = barcodeData.text;
    //   })
    // } else {
    //   console.log('Scan of QR not supported in browser....');
    // }
  }

}






