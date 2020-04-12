import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(public api: ApiService, public loadingController: LoadingController, private iab: InAppBrowser) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Espere mientas buscamos noticias...',
    });
    await loading.present();
    this.api.getNews().then(() => {
      loading.dismiss();
      console.log('Success');
    }, () => loading.dismiss());
  }

  abrirNoticia(url) {
    this.iab.create(url, '_system').show();
  }

}
