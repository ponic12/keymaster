import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//import { BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Flashlight } from '@ionic-native/flashlight';
import { Geolocation } from '@ionic-native/geolocation';
//import { NFC, Ndef } from '@ionic-native/nfc';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
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
      
  
  constructor(private barcodeScanner: BarcodeScanner, 
      private camera: Camera, 
      private flashlight:Flashlight,
      private geolocation:Geolocation
      //private nfc: NFC, private ndef: Ndef
  //  , private platform: Platform
  ) {  }
  
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
///////////////////////////////////////////////////////////////////

  imageData = null;
  camOptions: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
  
  takePic(){
    this.camera.getPicture(this.camOptions).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.imageData = base64Image;
      }, (err) => {
        console.log('error: ', err);
        alert('Error taking pic');
      }
    );
  }

///////////////////////////////////////////////////////////////////
  onOff:boolean = false;
  switchFlash(){
    this.onOff = !this.onOff;
    (this.onOff == true) ? this.flashlight.switchOn(): this.flashlight.switchOff();
  }

///////////////////////////////////////////////////////////////////
  gps = null;
  getCoords(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.gps = resp.coords;
      // resp.coords.latitude
      // resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
    //  let watch = this.geolocation.watchPosition();
    //  watch.subscribe((data) => {
    //   // data can be a set of coordinates, or an error (if an error occurred).
    //   // data.coords.latitude
    //   // data.coords.longitude
    //  });
  }
///////////////////////////////////////////////////////////////////








///////////////////////////////////////////////////////////////////
  // listenNFC(){
  //   this.nfc.addNdefListener(() => {
  //     console.log('successfully attached ndef listener');
  //   }, (err) => {
  //     console.log('error attaching ndef listener', err);
  //   }).subscribe((event) => {
  //     console.log('received ndef message. the tag contains: ', event.tag);
  //     console.log('decoded tag id', this.nfc.bytesToHexString(event.tag.id));
    
  //     let message = this.ndef.textRecord('Hello world');
  //     this.nfc.share([message]).then(this.onSuccessNFC).catch(this.onErrorNFC);
  //   });
  // }
  // onSuccessNFC(){
  //   alert('NFC OK');
  // }
  // onErrorNFC(){
  //   alert('NFC Error');
  // }
}






