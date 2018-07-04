import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { StorageService } from './services/storage.service';
import { HttpIntercept } from './services/http.interceptor';
import { FirebaseService } from './services/firebase.service';

import { HighlightDirective } from './directives/highlight.directive';
import { TelNumDirective } from './directives/tel-num.directive';

import { FwkServicesModule, ApplicationService, GlobalService } from 'fwk-services'

@NgModule({
  imports: [
    IonicStorageModule.forRoot()
  ],
  declarations: [
    HighlightDirective, 
    TelNumDirective],
  exports: [ 
    HighlightDirective, 
    TelNumDirective ],
  providers:[
    ApplicationService,
    StorageService,
    GlobalService,
    FirebaseService
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ApplicationService, 
        StorageService, 
        GlobalService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpIntercept,
          multi: true,
        }]
    };
  }
}
