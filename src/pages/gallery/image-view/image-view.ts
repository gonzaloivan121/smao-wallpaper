import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

@IonicPage()
@Component({
    selector: 'page-image-view',
    templateUrl: 'image-view.html',
})
export class ImageViewPage {

    img: {
        id: number,
        name: string,
        url: string,
        description: string
    };

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public translate: TranslateService,
        public loader: LoadingController
    ) {
        if (navParams.get('img')) {
            this.img = navParams.get('img');
        }
    }

    ionViewWillLeave() {
        console.log("Looks like I’m about to leave")
    }

}