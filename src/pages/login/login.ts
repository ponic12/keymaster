import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { GuardiaPage } from '../guardia/guardia';
import { UsuarioPage } from '../usuario/usuario';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username:string;
  password:string;
  
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
      
  
  constructor(public navCtrl:NavController) {  }
  
///////////////////////////////////////////////////////////////////  
  login():void{
    if (this.username == "u505100") // guardia
      this.navCtrl.push(GuardiaPage, {});
    else
      this.navCtrl.push(UsuarioPage, {});
  }

}






