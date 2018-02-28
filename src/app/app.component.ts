import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';

declare const FCMPlugin:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  title: string = "Key Master";
  version: string = "v1.0";

  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    console.log('MyApp contructor');
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.initFCM();
  }

  private initFCM(){
    FCMPlugin.subscribeToTopic('registrationTopic ');
  }
}

