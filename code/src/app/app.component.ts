import { Component, OnInit, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { GlobalService } from 'fwk-services';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class KeymasterApp implements OnInit{
  title: string = "Key Master";
  version: string = "v1.0";
  networkStatus: boolean;

  rootPage: any = LoginPage;

  constructor(
    private globalSrv:GlobalService,
    public platform: Platform, 
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public network:Network,
    private zone: NgZone){
    console.log('KeymasterApp contructor');
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  ngOnInit(){
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

  private initNetwork(){
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
