import { ZoomAreaProvider } from 'ionic2-zoom-area';
import { StatusBar } from '@ionic-native/status-bar';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, PopoverController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { PopoverPage } from '../../popover/popover';

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
        description: string,
        date: number,
        metadata?: object,
        camera?: object
    };

    scale = 1;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public translate: TranslateService,
        public popoverCtrl: PopoverController,
        public statusBar: StatusBar,
        public zoomAreaProvider: ZoomAreaProvider,
        public menuCtrl: MenuController
    ) {
        if (navParams.get('img')) {
            this.img = navParams.get('img');
        }
    }

    ionViewWillEnter() {
        this.statusBar.hide();
    }

    afterZoomIn(e) {
        console.log(e)
    }

    afterZoomOut(e) {
        console.log(e)
    }

    ionViewWillLeave() {
        this.statusBar.show();
    }

    menu(event) {
        var popover = this.popoverCtrl.create(PopoverPage, { img: this.img });
        popover.present({
            ev: event
        });
    }

}