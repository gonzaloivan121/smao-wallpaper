import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

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

    classPage = "";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public translate: TranslateService,
        public loader: LoadingController,
        public events: Events,
        public platform: Platform
    ) {
        if (navParams.get('img')) {
            this.img = navParams.get('img');
        }

        events.subscribe('tabs:hide', () => {
            this.classPage = "tabsHidden";
        });

        events.subscribe('tabs:show', () => {
            this.classPage = "";
        });

        platform.registerBackButtonAction(() => {
            console.log("back button")
            if (this.classPage == "tabsHidden") {
                events.publish('tabs:slide');
                events.publish('tabs:show');
            } else {
                console.log(navCtrl.indexOf(navCtrl.getActive()))
                //navCtrl.pop();
            }
        }, 1);
    }

    ionViewWillLeave() {
        this.events.publish('tabs:show');
        //console.log("Looks like I’m about to leave")
    }

}