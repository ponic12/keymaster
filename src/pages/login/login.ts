import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  username: string;
  password: string;

  constructor(public navCtrl: NavController) {
    console.log('LoginPage constructor');
  }
  ngOnInit() {
    console.log('LoginPage init');
  }
  ///////////////////////////////////////////////////////////////////  
  login(): void {
    var usr = this.username.toLowerCase();
    switch (usr) {
      case "u222222":
        this.navCtrl.push('GuardiaPage', {});
        break;
      case "u111111":
        this.navCtrl.push('AdminPage', {});
        break;
      default:
        this.navCtrl.push('UsuarioPage', {});
        break;
    }
  }

}






