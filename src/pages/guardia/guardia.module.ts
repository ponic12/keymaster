import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { GuardiaService } from './guardia.service';
import { GuardiaPage } from './guardia';

import { RegistracionPage } from './registracion/registracion';
import { ListadoPage } from './listado/listado';
import { FilterReg } from './listado/filterReg.pipe';

@NgModule({
  imports: [
    NgxQRCodeModule,
    IonicPageModule.forChild(GuardiaPage),
  ],
  declarations: [
    GuardiaPage,
    RegistracionPage,
    ListadoPage,
    FilterReg
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
