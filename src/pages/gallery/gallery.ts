import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, App } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';

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
    public loader: LoadingController,
    public platform: Platform,
    public events: Events,
    public appCtrl: App,
    public statusBar: StatusBar
  ) {
    this.getImages();
    statusBar.show();

    translate.get(["PULLING_TEXT", "REFRESHING_TEXT"]).subscribe(val => {
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
        refresher.complete();
        loading.dismiss();

        console.log('Async operation has ended');
      }, 1000);
    }
  }

  doPulling(pull) {
    pull.pullMax = 250;
  }

  getImages() {
    this.api.get().then((val) => {
      for (var i in val) {
        this.images.push(val[i]);
      }
    });
  }

  click(img: { id: number, name: string, url: string, description: string, date: number, metadata?: object, camera?: object }) {
    this.appCtrl.getRootNav().push('ImageViewPage', { img: img });
    this.events.publish('img:view', img);
  }

}