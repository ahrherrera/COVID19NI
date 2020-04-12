import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppCenterCrashes } from '@ionic-native/app-center-crashes/ngx';
import { AppCenterAnalytics } from '@ionic-native/app-center-analytics/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appCrash: AppCenterCrashes,
    private appAnalytics: AppCenterAnalytics
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.statusBar.overlaysWebView(false);

      this.appAnalytics.setEnabled(true).then(() => {
        this.appAnalytics.trackEvent('START', { fecha: new Date().toISOString() }).then(() => {
          console.log('Event tracked');
        });
      });

      this.appCrash.setEnabled(true).then(() => {
        this.appCrash.lastSessionCrashReport().then(report => {
          console.log('Crash report', report);
        });
      });
    });
  }
}
