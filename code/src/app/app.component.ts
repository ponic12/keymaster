import { Component, OnInit, OnDestroy, ViewChild, NgZone } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CodePush, SyncStatus } from '@ionic-native/code-push'
import { AngularFirestore } from 'angularfire2/firestore'

import { GlobalService, ApplicationService } from 'fwk-services';

import { CommonModule } from '@angular/common'

@Component({
   templateUrl: 'app.html'
})
export class KeymasterApp implements OnInit, OnDestroy {
   @ViewChild('content') nav: NavController

   prog: number = 0
   showProgressBar: boolean = false;

   title: string = "Key Master";
   version: string = "v1.0";

   constructor(
      private codePush: CodePush,
      private appSrv: ApplicationService,
      private afs: AngularFirestore,
      private globalSrv: GlobalService,
      private platform: Platform,
      private statusBar: StatusBar,
      private splashScreen: SplashScreen,
      private zone: NgZone) {
      console.log('KeymasterApp contructor');
      this.afs.firestore.settings({ timestampsInSnapshots: true });
      this.afs.firestore.enablePersistence();

      this.platform.ready().then(() => {
         console.log('platform ready....')
         setTimeout(() => {
            console.log('starting update validation......')
            this.codePush.sync({}, (progress) => {
               this.zone.run(() => {
                  this.prog = Math.floor(progress.receivedBytes / progress.totalBytes * 100)
                  console.log('progress: ', this.prog)
               })
            }).subscribe(status => {
               switch (status) {
                  case SyncStatus.CHECKING_FOR_UPDATE:
                     console.log('CHECKING_FOR_UPDATE: ', SyncStatus.CHECKING_FOR_UPDATE)
                     this.appSrv.message('checking for update', '')
                     break;
                  case SyncStatus.AWAITING_USER_ACTION:
                     console.log('AWAITING_USER_ACTION: ', SyncStatus.AWAITING_USER_ACTION)
                     this.appSrv.basicAlert('waiting for user input')
                     break;
                  case SyncStatus.IN_PROGRESS:
                     console.log('IN_PROGRESS: ', SyncStatus.IN_PROGRESS)
                     this.appSrv.message('update in progress')
                     break;
                  case SyncStatus.DOWNLOADING_PACKAGE:
                     console.log('DOWNLOADING_PACKAGE: ', SyncStatus.DOWNLOADING_PACKAGE)
                     this.appSrv.message('downloading package')
                     this.zone.run(() => {
                        this.showProgressBar = true
                        console.log('showProgressBar: ', this.showProgressBar)
                     })
                     break;
                  case SyncStatus.UP_TO_DATE:
                     console.log('UP_TO_DATE: ', SyncStatus.UP_TO_DATE)
                     this.appSrv.message('app up to date')
                     break;
                  case SyncStatus.INSTALLING_UPDATE:
                     console.log('INSTALLING_UPDATE: ', SyncStatus.INSTALLING_UPDATE)
                     this.appSrv.message('installing update')
                     break;
                  case SyncStatus.UPDATE_IGNORED:
                     console.log('UPDATE_IGNORED: ', SyncStatus.UPDATE_IGNORED)
                     this.appSrv.message('update ignored')
                     break;
                  case SyncStatus.UPDATE_INSTALLED:
                     console.log('UPDATE_INSTALLED: ', SyncStatus.UPDATE_INSTALLED)
                     this.codePush.restartApplication();
                     this.appSrv.basicAlert('update installed, restart app!')
                  case SyncStatus.ERROR:
                     this.appSrv.message('SyncStatus.ERROR....')
                     console.log('SyncStatus.ERROR: ', SyncStatus.ERROR)
                     break;
               }
            })
         }, 3000);

         // Okay, so the platform is ready and our plugins are available.
         // Here you can do any higher level native things you might need.
         this.statusBar.styleDefault()
         //statusBar.styleBlackOpaque()
         this.splashScreen.hide()
      }).catch(err => {
         console.error(err)
         this.appSrv.basicAlert(err, 'Error!')
      })
   }
   ngOnDestroy() {
      console.warn('KeyMasterApp destroy');
   }
   ngOnInit() {
      console.log('KeyMasterApp init')
      //  this.globalSrv.networkStatus.subscribe(x => {
      //    this.zone.run(() => {
      //      this.networkStatus = x;
      //    });
      //    console.log('networkStatus: ', this.networkStatus);
      //  });
   }

   logout() {
      this.globalSrv.get('user').then(u => {
         u = null
         this.globalSrv.save('user', u)
         this.nav.setRoot('LoginPage')
      });
   }
}

