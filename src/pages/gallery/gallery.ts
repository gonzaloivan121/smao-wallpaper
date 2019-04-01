import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
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
    public translate: TranslateService,
    public loader: LoadingController
  ) {
    this.getImages();

    this.translate.get(["PULLING_TEXT", "REFRESHING_TEXT"]).subscribe(val => {
      this.refreshingText = val;
    });
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    if (this.images.length > 0) {
      let loading;
      this.translate.get("LOADING").subscribe(val => {
        loading = this.loader.create({
          spinner: "dots",
          content: val
        });
      });
      
      loading.present();

      setTimeout(() => {
        this.images = [];
        this.getImages();
        loading.dismiss();
        refresher.complete();

        console.log('Async operation has ended');
      }, 1000);
    }
  }

  doPulling(pull) {
    pull.pullMax = 200;
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