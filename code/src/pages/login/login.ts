import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ApplicationService, GlobalService } from 'fwk-services';
import { Empleado } from '../../shared/entities/empleado';

declare const FCMPlugin: any;

@IonicPage()
@Component({
   selector: 'page-login',
   templateUrl: 'login.html'
})
export class LoginPage implements OnInit, OnDestroy {
   username: string
   password: string
   userInfo: Empleado

   constructor(
      private navCtrl: NavController,
      private platform: Platform,
      private globalSrv: GlobalService,
      private appSrv: ApplicationService
   ) {
      console.log('LoginPage constructor');
   }
   ngOnDestroy(){
      console.log('LoginPage destroy');
   }
   ngOnInit() {
      console.log('LoginPage init');
      this.globalSrv.get('user').then((u) => {
         if (!u)
            this.userInfo = new Empleado()
         else
            this.userInfo = u
      })
   }
   ///////////////////////////////////////////////////////////////////  
   login(): void {
      this.userInfo.legajo = this.username.toUpperCase();
      switch (this.userInfo.legajo) {
         case "U000000":
            this.navCtrl.push('GuardiaPage', {});
            break;
         case "U111111":
            this.navCtrl.push('AdminPage', {});
            break;
         default:
            this.navCtrl.push('UsuarioPage', {});
            break;
      }
      this.globalSrv.save('user', this.userInfo);
      this.initFCM(this.userInfo.legajo);
   }
   private initFCM(usr) {
      if (((this.platform.is('mobileweb') == true) || (this.platform.is('core') == true)) == false) {
         var self = this;
         FCMPlugin.getToken(
            function (id) {
               console.log(id);
               //self.registerUser(self.user, id);
            },
            function (err) {
               console.log('error retrieving token: ' + err);
            }
         );

         FCMPlugin.subscribeToTopic(usr);
         //FCMPlugin.subscribeToTopic('registrationTopic');
         //FCMPlugin.unsubscribeFromTopic('topicExample');

         // FCMPlugin.onTokenRefresh().subscribe(id=>{
         //   alert('token refresh!');
         //   this.registerUser(this.user, id);
         // })

         FCMPlugin.onNotification(
            function (data) {
               self.evalNotification(data);
            },
            function (msg) {
               console.log('onNotification callback successfully registered: ' + msg);
            },
            function (err) {
               console.log('Error registering onNotification callback: ' + err);
            }
         );
      }
   }
   private evalNotification(data) {
      if (data.type == "registro") {
         this.appSrv.message('Se ha registrado la llave ' + data.llave);
         this.navCtrl.push('UsuarioPage', data);
      }
      if (data.type == "devolucion") {
         this.appSrv.message('Se ha devuelto la llave ' + data.llave);
         this.navCtrl.push('UsuarioPage', data);
      }
   }
}






