import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { Camera } from '@ionic-native/camera';
import { Flashlight } from '@ionic-native/flashlight';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { SharedModule } from './shared/shared.module';
import { UsuarioModule } from '../pages/usuario/usuario.module';
import { GuardiaModule } from '../pages/guardia/guardia.module';
import { AdminModule } from '../pages/admin/admin.module';

@NgModule({
  declarations: [
    MyApp,
    LoginPage
  ],
  imports: [
    UsuarioModule,
    GuardiaModule,
    AdminModule,
    SharedModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    Flashlight,
    Geolocation
  ]
})
export class AppModule {}
