import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ApplicationService } from '../../../app/shared/services/application.service';
//import { BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
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

@Component({
  selector: 'page-registracion',
  templateUrl: 'registracion.html'
})
export class RegistracionPage implements OnInit {
  userInfo = {legajo:'', nombre:'', apellido:'', llave:''};
  qrUser = null;
  iconType = "pm-output";
  operation = "Registro de llave";
  showOperation:boolean = false;

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
    this.blankUser();
  }

  scanUser() {
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        var obj = JSON.parse(barcodeData.text);
        this.userInfo = obj;
        if (obj.llave){
          this.iconType = "pm-input";
          this.operation = "Devolucion llave";
          this.userInfo.llave = obj.llave;
          this.qrUser = JSON.stringify(this.userInfo);
        }
        else{
          this.iconType = "pm-output";
          this.operation = "Registro de llave";
        }
        this.qrUser = JSON.stringify(this.userInfo);
      })
    } else {
      this.appSrv.message('Error', 'QR no disponible en web');
      console.log('Scan of QR not supported in browser....');
    }
  }
  scanKey() {
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        this.userInfo.llave = JSON.parse(barcodeData.text);
        this.qrUser = JSON.stringify(this.userInfo);
      })
    } else {
      this.appSrv.message('Error', 'QR no disponible en web');
      console.log('Scan of QR not supported in browser....');
    }
  }
  onKeyChange(e){
    this.qrUser = JSON.stringify(this.userInfo);
    this.showOperation = ((this.userInfo.legajo!='') && (this.userInfo.llave!=''));

  }
  callServer(){
    if (this.iconType == "pm-output")
      this.appSrv.message('Informacion','Llave '+this.userInfo.llave+' registrada al usuario: '+ this.userInfo.legajo);
    if (this.iconType == "pm-input")
      this.appSrv.message('Informacion','Llave '+this.userInfo.llave+' devuelta por el usuario: '+ this.userInfo.legajo);
    this.blankUser();
  }

  private blankUser(){
    this.userInfo = {legajo:'', nombre:'', apellido:'', llave:''};
  }
}






