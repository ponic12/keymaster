import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { ApplicationService } from '../../../shared/services/application.service';
import { FirebaseService } from '../../../shared/services/firebase.service';
import { Empleado } from '../../../shared/entities/empleado';
import { Llave } from '../../../shared/entities/llave';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

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
  llaves$: Observable<Llave[]>;
  userInfo = { legajo: '', nombre: '', apellido: '', llave: '' };
  qrUser = null;
  iconType = "pm-output";
  operation = "Registro de llave";
  disableInfo = false;
  disableKey = false;

  constructor(
    public navCtrl: NavController,
    private appSrv: ApplicationService,
    private alertCtrl: AlertController,
    private barcodeScanner: BarcodeScanner,
    private platform: Platform,
    private fs: FirebaseService
  ) {
    console.log('RegistracionPage constructor');
  }
  ngOnInit() {
    console.log('RegistracionPage init');
    this.llaves$ = this.fs.getLlavesDisponibles(true);
  }

  getLlaves(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.llaves$ = this.llaves$.filter((item) => {
        return (item['nombre'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  scanUser() {
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then(barcodeData => {
        var obj = JSON.parse(barcodeData.text);
        this.userInfo = obj;
        this.disableInfo = true;
        if (obj.llave) {
          this.disableKey = true;
          this.iconType = "pm-input";
          this.operation = "Devolucion llave";
          this.userInfo.llave = obj.llave;
          this.qrUser = JSON.stringify(this.userInfo);
        }
        else {
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
        this.disableKey = true;
      })
    } else {
      this.appSrv.message('Error', 'QR no disponible en web');
      console.log('Scan of QR not supported in browser....');
    }
  }
  onKeyChange(e) {
    this.qrUser = JSON.stringify(this.userInfo);
  }
  callServer() {
    var vm = this;
    if (this.iconType == "pm-input"){
      this.fs.register(this.userInfo)
      .then(function (docRef) {
        console.log("New reg ID: ", docRef.id);
        vm.appSrv.message('Informacion', 'Llave ' + vm.userInfo.llave + ' registrada al usuario: ' + vm.userInfo.legajo);
        this.blankRec();
      })
      .catch(function (error) {
        console.error("Error registering: ", error);
      });
    }
    else{
      this.fs.unregister(this.userInfo)
      .then(function(){
        vm.appSrv.message('Informacion', 'Llave ' + vm.userInfo.llave + ' devuelta por el usuario: ' + vm.userInfo.legajo);
        vm.blankRec();    
      })
      .catch(function (error) {
        console.error("Error unregistering: ", error);
      });      
    }
  }

  private blankRec() {
    this.disableInfo = false;
    this.disableKey = false;
  }
}






