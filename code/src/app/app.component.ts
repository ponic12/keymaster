import { Component, OnInit, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { CodePush, SyncStatus } from '@ionic-native/code-push'
import { AngularFirestore } from 'angularfire2/firestore'

import { GlobalService, ApplicationService } from 'fwk-services';
import { LoginPage } from '../pages/login/login';



@Component({
   templateUrl: 'app.html'
})
export class KeymasterApp implements OnInit {
   progressStatus:string=""

   title: string = "Key Master";
   version: string = "v1.0";
   networkStatus: boolean;

   rootPage: any = LoginPage;

   constructor(
      private codePush: CodePush,
      private appSrv: ApplicationService,
      private afs: AngularFirestore,
      private globalSrv: GlobalService,
      private platform: Platform,
      private statusBar: StatusBar,
      private splashScreen: SplashScreen,
      private network: Network,
      private zone: NgZone) {
      console.log('KeymasterApp contructor');
      this.afs.firestore.settings({ timestampsInSnapshots: true });
      this.afs.firestore.enablePersistence();
      platform.ready().then(() => {
         this.codePush.sync({}, (progress) => {
            this.progressStatus = JSON.stringify(progress)
         }).subscribe(status => {
            switch (status) {
               case SyncStatus.CHECKING_FOR_UPDATE:
                  this.appSrv.message('checking for update', '')
                  break;
               case SyncStatus.AWAITING_USER_ACTION:
                  this.appSrv.basicAlert('waiting for user input')
                  break;
               case SyncStatus.IN_PROGRESS:
                  this.appSrv.message('update in progress')
                  break;
               case SyncStatus.DOWNLOADING_PACKAGE:
                  this.appSrv.message('downloading package')
                  break;
               case SyncStatus.UP_TO_DATE:
                  this.appSrv.message('app up to date')
                  break;
               case SyncStatus.INSTALLING_UPDATE:
                  this.appSrv.message('installing update')
                  break;
               case SyncStatus.UPDATE_IGNORED:
                  this.appSrv.message('update ignored')
                  break;
               case SyncStatus.UPDATE_INSTALLED:
                  this.appSrv.message('update installed')
                  setTimeout(() => {
                     window.location.reload();
                  }, 1000);
               case SyncStatus.ERROR:
                  this.appSrv.basicAlert('an error occurred')
                  break;
            }
         })
         // Okay, so the platform is ready and our plugins are available.
         // Here you can do any higher level native things you might need.
         statusBar.styleDefault()
         //statusBar.styleBlackOpaque()
         splashScreen.hide()
      }).catch(err => {
         console.error(err)
         this.appSrv.basicAlert(err.message, 'Error!')
      })
   }
   ngOnInit() {
      //  this.globalSrv.networkStatus.subscribe(x => {
      //    this.zone.run(() => {
      //      this.networkStatus = x;
      //    });
      //    console.log('networkStatus: ', this.networkStatus);
      //  });
   }

   changeNetworkStatus() {
      //this.globalSrv.changeNetworkStatus(!this.networkStatus);
   }

   private initNetwork() {
      let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
         console.log('network disconnected!');
         //this.globalSrv.changeNetworkStatus(false);
      });
      //disconnectSubscription.unsubscribe();

      let connectSubscription = this.network.onConnect().subscribe(() => {
         console.log('network connected!');
         //this.globalSrv.changeNetworkStatus(true);
      });
      //connectSubscription.unsubscribe();
   }
}

