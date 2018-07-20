import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CodePush } from '@ionic-native/code-push'

import 'firebase/storage';
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { FirebaseService } from '../shared/services/firebase.service'
import { FIREBASE_CONFIG } from '../shared/services/firebase.config'

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
      AngularFirestoreModule,
      AngularFireModule.initializeApp(FIREBASE_CONFIG),
   ],
   bootstrap: [IonicApp],
   entryComponents: [
      KeymasterApp,
      LoginPage
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
export class AppModule { }
