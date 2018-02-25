import { Component, OnInit } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//import { BarcodeScannerOptions } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-identificacion',
  templateUrl: 'identificacion.html'
})
export class IdentificacionPage implements OnInit{
  userInfo = {legajo:"U506713", nombre:"Pablo Alberto", apellido:"Massad", llave:"303"};
  qrCode = null;
  scannedCode = null;
  keyConfirmed:boolean = false;

  
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
      
  
  constructor(private barcodeScanner: BarcodeScanner) {
    console.log('IdentificacionPage constructor');
  }
  ngOnInit(){
    console.log('IdentificacionPage init');
    // Obtiene la informacion del usuario del storage local x servicio
    // this.userSrv.getUserInfo();
    this.qrCode = JSON.stringify(this.userInfo);
  }
///////////////////////////////////////////////////////////////////  
  createCode(){
    this.qrCode = "hola"; this.userInfo;
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






