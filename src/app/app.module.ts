import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { Flashlight } from '@ionic-native/flashlight';
import { Geolocation } from '@ionic-native/geolocation';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { AdminPage } from '../pages/admin/admin';
import { InventarioPage } from '../pages/admin/inventario/inventario';
import { EstadisticasPage } from '../pages/admin/estadisticas/estadisticas';

import { GuardiaPage } from '../pages/guardia/guardia';
import { RegistracionPage } from '../pages/guardia/registracion/registracion';
import { DesregistracionPage } from '../pages/guardia/desregistracion/desregistracion';
import { ListadoPage } from '../pages/guardia/listado/listado';

import { UsuarioPage } from '../pages/usuario/usuario';
import { IdentificacionPage } from '../pages/usuario/identificacion/identificacion';
import { TransferenciaPage } from '../pages/usuario/transferencia/transferencia';
import { HistoricoPage } from '../pages/usuario/historico/historico';

import { HomePage } from '../pages/home/home';

import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AdminPage,
    InventarioPage,
    EstadisticasPage,
    GuardiaPage,
    RegistracionPage,
    DesregistracionPage,
    ListadoPage,
    UsuarioPage,
    IdentificacionPage,
    TransferenciaPage,
    HistoricoPage,
    HomePage
  ],
  imports: [
    SharedModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    NgxQRCodeModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AdminPage,
    InventarioPage,
    EstadisticasPage,
    GuardiaPage,
    RegistracionPage,
    DesregistracionPage,
    ListadoPage,
    UsuarioPage,
    IdentificacionPage,
    TransferenciaPage,
    HistoricoPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Camera,
    Flashlight,
    Geolocation
  ]
})
export class AppModule {}
