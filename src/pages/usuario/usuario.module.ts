import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { SharedModule } from '../../app/shared/shared.module';
import { UsuarioService } from './usuario.service';
import { UsuarioPage } from './usuario';

// import { IdentificacionPage } from './identificacion/identificacion';
// import { TransferenciaPage } from './transferencia/transferencia';
// import { HistoricoPage } from './historico/historico';


@NgModule({
  imports: [
    SharedModule,
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
