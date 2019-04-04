import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular/platform/platform';
import { TabsPage } from '../../../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  img;
  style;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public transalte: TranslateService,
    public sanitization: DomSanitizer,
    public statusBar: StatusBar,
    public platform: Platform,
    public events: Events
  ) {
    statusBar.show();
    statusBar.backgroundColorByName('white');
    statusBar.styleDefault();

    if (this.navParams.get('img')) {
      this.img = this.navParams.get('img');
    }

    if (this.img != undefined) {
      var txt = "background-image: url('" + this.img.url + "');";
      this.style = this.sanitization.bypassSecurityTrustStyle(txt);
    }

    this.platform.registerBackButtonAction(() => {
      if (navCtrl.canGoBack()) {
        navCtrl.pop();
      } else {
        if (navCtrl.setRoot(TabsPage)) {
          statusBar.show();
        }
      }
    });
  }

  ionViewDidLoad() {
    if (this.img == undefined || this.style == undefined) {
      var toast;
      this.transalte.get("ERROR").subscribe(val => {
        toast = this.toastCtrl.create({
          message: val
        });
      });
      toast.present();
      this.navCtrl.setRoot('TabsPage');
    }
  }

  ionViewWillLeave() {
    this.statusBar.backgroundColorByHexString('#28af50');
    this.statusBar.styleLightContent();
    this.statusBar.hide();
  }

  copy(event) {
    console.log(event)
  }

}