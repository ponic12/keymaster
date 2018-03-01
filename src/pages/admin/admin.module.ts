import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { AdminService } from './admin.service';
import { AdminPage } from './admin';

import { EstadisticasPage } from './estadisticas/estadisticas';
import { InventarioPage } from './inventario/inventario';


@NgModule({
  imports: [
    NgxQRCodeModule,
    IonicPageModule.forChild(AdminPage),
  ],
  declarations: [
      AdminPage,
      EstadisticasPage,
      InventarioPage
    ],
  entryComponents:[
    EstadisticasPage,
    InventarioPage
  ],
  providers:[
    BarcodeScanner,
    AdminService
    ]
})
export class AdminModule {
    constructor(){
        console.log('AdminModule constructor');
    }
}
