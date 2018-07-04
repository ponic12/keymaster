import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { Flashlight } from '@ionic-native/flashlight';
import { Geolocation } from '@ionic-native/geolocation';

import { KeymasterApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { SharedModule } from '../shared/shared.module';
import { UsuarioModule } from '../pages/usuario/usuario.module';
import { GuardiaModule } from '../pages/guardia/guardia.module';
import { AdminModule } from '../pages/admin/admin.module';


export const firebaseConfig ={
  apiKey: "AIzaSyBz1Fop1vo9UEFih4nDmlcqerJ9mV5HCOI",
  authDomain: "keymaster-c4ee3.firebaseapp.com",
  databaseURL: "https://keymaster-c4ee3.firebaseio.com",
  projectId: "keymaster-c4ee3",
  storageBucket: "keymaster-c4ee3.appspot.com",
  messagingSenderId: "910397781327"
};

@NgModule({
  declarations: [
    KeymasterApp,
    LoginPage
  ],
  imports: [
    UsuarioModule,
    GuardiaModule,
    AdminModule,
    BrowserModule,
    SharedModule.forRoot(),
    IonicModule.forRoot(KeymasterApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule // AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    KeymasterApp,
    LoginPage
  ],
  providers: [
    Network,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    Flashlight,
    Geolocation
  ]
})
export class AppModule {}
