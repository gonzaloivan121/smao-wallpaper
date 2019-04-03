import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  img;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController
  ) {
    if (this.navParams.get('img')) {
      this.img = this.navParams.get('img');
    }
  }

  ionViewDidLoad() {
    console.log(this.img)
  }

}