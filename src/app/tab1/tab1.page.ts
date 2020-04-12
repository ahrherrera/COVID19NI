import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  nicaragua: any = {};
  global: any = {};

  constructor(private api: ApiService, public loadingController: LoadingController, private iab: InAppBrowser,
              private appAnalytics: AppCenterAnalytics) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Espere mientas consultamos la información...',
    });
    await loading.present();
    this.api.getStatsWorld().then(() => {
      this.appAnalytics.trackEvent('LOAD_DATA', { tipo: 'MUNDO' }).then(() => {
        console.log('Event tracked');
      });
      this.global = this.api.statsWorld;
      this.api.getStats().then(() => {
        loading.dismiss();
        this.nicaragua = this.api.stats;
        this.appAnalytics.trackEvent('LOAD_DATA', { tipo: 'LOCAL' }).then(() => {
          console.log('Event tracked');
        });
      }, error => {
        loading.dismiss();
        this.appAnalytics.trackEvent('ERR_LOAD_DATA', { tipo: 'LOCAL' }).then(() => {
          console.log('Event tracked');
        });
      });
    }, error => {
      loading.dismiss();
      this.appAnalytics.trackEvent('ERR_LOAD_DATA', { tipo: 'MUNDO' }).then(() => {
        console.log('Event tracked');
      });
    });
  }

  moreInfo() {
    this.iab.create('http://www.minsa.gob.ni/', '_system').show();
  }

}
