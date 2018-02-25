import { NgModule, ModuleWithProviders } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

import { ApplicationService } from './services/application.service';
import { StorageService } from './services/storage.service';
import { GlobalService } from './services/global.service';
import { HighlightDirective } from './directives/highlight.directive';
import { TelNumDirective } from './directives/tel-num.directive';
import { HttpIntercept } from './http.interceptor';

@NgModule({
  imports: [
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  declarations: [
    HighlightDirective, 
    TelNumDirective],
  exports: [ 
    HighlightDirective, 
    TelNumDirective ]
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
