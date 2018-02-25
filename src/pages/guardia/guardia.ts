import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//import { BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { RegistracionPage } from './registracion/registracion';
import { DesregistracionPage } from './desregistracion/desregistracion';
import { ListadoPage } from './listado/listado';

@Component({
  selector: 'page-guardia',
  templateUrl: 'guardia.html'
})
export class GuardiaPage {

  tabs1 = ListadoPage;
  tabs2 = RegistracionPage;
  tabs3 = DesregistracionPage;


  title:string = "Key Master";
  version:string = "v1.0";

  keyCode:string = null;
  userCode = null;

  
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
    //this.tab1 = TabsTextContentPage;
    //this.tab2 = TabsTextContentPage;
   }
  
  readQRKey(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.keyCode = barcodeData.text;
    })
  }

  readQRUser(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.userCode = barcodeData.text;
    })
  }

  readUserData(){
    // Open login popup
  }

  registerKey(){
    var data = {};//{key:this.keyCode, user:this.userCode.legajo, datetime:new Date().getTime()};
    console.log('Registration data: ', data);
  }

}






