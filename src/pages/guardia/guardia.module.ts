import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { SharedModule } from '../../app/shared/shared.module';
import { GuardiaService } from './guardia.service';
import { GuardiaPage } from './guardia';

import { RegistracionPage } from './registracion/registracion';
import { ListadoPage } from './listado/listado';


@NgModule({
  imports: [
    SharedModule,
    NgxQRCodeModule,
    IonicPageModule.forChild(GuardiaPage),
  ],
  declarations: [
    GuardiaPage,
    RegistracionPage,
    ListadoPage
  ],
  entryComponents: [
    RegistracionPage,
    ListadoPage
  ],
  providers: [
    BarcodeScanner,
    GuardiaService
  ]
})
export class GuardiaModule {
  constructor() {
    console.log('GuardiaModule constructor');
  }
}
