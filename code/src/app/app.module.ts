import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CodePush } from '@ionic-native/code-push'

import { Network } from '@ionic-native/network';
import { Camera } from '@ionic-native/camera';
import { Flashlight } from '@ionic-native/flashlight';
import { Geolocation } from '@ionic-native/geolocation';

import { KeymasterApp } from './app.component';
import { SharedModule } from '../shared/shared.module';

import 'firebase/storage';
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { FirebaseService } from '../shared/services/firebase.service'
import { FIREBASE_CONFIG } from '../shared/services/firebase.config'


@NgModule({
   declarations: [
      KeymasterApp
   ],
   imports: [
      BrowserModule,
      IonicModule.forRoot(KeymasterApp),
      AngularFirestoreModule,
      AngularFireModule.initializeApp(FIREBASE_CONFIG),
      SharedModule.forRoot()
   ],
   bootstrap: [IonicApp],
   entryComponents: [
      KeymasterApp
   ],
   providers: [
      CodePush,
      FirebaseService,
      Network,
      StatusBar,
      SplashScreen,
      { provide: ErrorHandler, useClass: IonicErrorHandler },
      Camera,
      Flashlight,
      Geolocation
   ]
})
export class AppModule { 
   constructor() {
      console.log('AppModule constructor');
   }
}
