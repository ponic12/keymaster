import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ApplicationService } from '../../../app/shared/services/application.service';
//import { BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-registracion',
  templateUrl: 'registracion.html'
})
export class RegistracionPage implements OnInit {
  userInfo = {legajo:'', nombre:'', apellido:'', llave:''};
  keyVal = null;
  keyQR = null;
  hasKey = false;

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


  constructor(
    public navCtrl: NavController,
    private appSrv:ApplicationService,
    private alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner,
    private platform:Platform
  ) {
    console.log('RegistracionPage constructor');
  }
  ngOnInit() {
    console.log('RegistracionPage init');
    this.blankUser;
  }
  ///////////////////////////////////////////////////////////////////  
  scanKey() {
    this.keyVal = this.scanQR();
  }
  scanUser() {
    this.userInfo = JSON.parse(this.scanQR());
    this.hasKey = true;
  }
  onKeyChange(e){
    this.generateQR(e);
  }
  regKey(){
    this.appSrv.message('Informacion','Llave '+this.userInfo.llave+' registrada al usuario: '+ this.userInfo.legajo);
    this.blankUser();
  }

  private blankUser(){
    this.userInfo = {legajo:'', nombre:'', apellido:'', llave:''};
  }
  private generateQR(msg){
    this.keyQR = JSON.stringify(msg);
  }
  private scanQR():any {
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        return barcodeData.text;
      })
    } else {
      this.appSrv.message('Error', 'QR no disponible en web');
      console.log('Scan of QR not supported in browser....');
    }
  }

}






