import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { UsuarioService } from './usuario.service';
import { UsuarioPage } from './usuario';

@NgModule({
  imports: [
    NgxQRCodeModule,
    IonicPageModule.forChild(UsuarioPage),
  ],
  declarations: [
    UsuarioPage
  ],
  entryComponents: [ ],
  providers: [
    BarcodeScanner,
    UsuarioService
  ]
})
export class UsuarioModule {
  constructor() {
    console.log('UsuarioModule constructor');
  }
}
