import { Component, OnInit, Input, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'tools-bar',
  templateUrl: 'tools-bar.component.html'
})
export class ToolsBarComponent implements OnInit {
  @Input() title;
  safOpsCounter: number;
  alertsCounter: number;
  networkStatus: boolean;

  constructor(
    private navCtrl: NavController, 
    private globalSrv: GlobalService,
    private zone: NgZone) {
    console.log('ToolsBarComponent constructor');
  }

  ngOnInit(): void {
    this.globalSrv.safOpsCounter.subscribe(x =>
      this.safOpsCounter = x);
    this.globalSrv.alertsCounter.subscribe(x =>
      this.alertsCounter = x);
    this.globalSrv.networkStatus.subscribe(x => {
      this.zone.run(() => {
        this.networkStatus = x;
      });
      console.log('networkStatus: ', this.networkStatus);
    });
    console.log('ToolsBaromponent init');
    console.log('title:', this.title);
  }
  ionViewDidLoad() {
    console.log('ToolsBarComponent ionViewDidLoad')
  }

  changeNetworkStatus() {
    this.globalSrv.changeNetworkStatus(!this.networkStatus);
  }
}
