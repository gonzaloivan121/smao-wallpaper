import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {

  images: Array<any> = [];
  refreshingText: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public translate: TranslateService
  ) {
    this.getImages();

    this.translate.get(["PULLING_TEXT", "REFRESHING_TEXT"]).subscribe(val => {
      this.refreshingText = val;
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  getImages() {
    this.api.get().then((val) => {
      for (var i in val) {
        this.images.push(val[i]);
      }
    });
  }

  click(img: { id: number, name: string, url: string }) {
    console.log(img)
  }

}