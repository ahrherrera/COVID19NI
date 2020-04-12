import { Component } from '@angular/core';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(private photoViewer: PhotoViewer) {}

  showImage() {
    this.photoViewer.show('https://www.unach.mx/images/2020/infografia_covid19UNACH.jpg', 'INFO COVID19', {share: true});
  }

}
