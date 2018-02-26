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
    if (this.username == "u506713") // empleado
      this.navCtrl.push('UsuarioPage', {});

    if (this.username == "u222222") // guardia
      this.navCtrl.push('GuardiaPage', {});      

    if (this.username == "u111111") // admin
      this.navCtrl.push('AdminPage', {});
  }

}






