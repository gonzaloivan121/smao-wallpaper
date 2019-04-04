import { Component } from '@angular/core';
import { ViewController, NavController, ToastController, Events, NavParams, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'page-popover',
    templateUrl: 'popover.html'
})
export class PopoverPage {

    list = new Array();
    img: any;

    constructor(
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public toastCtrl: ToastController,
        public translate: TranslateService,
        public events: Events,
        public platform: Platform
    ) {
        translate.get(["INFO", "ADD_FAVOURITES", "USE_AS", "PRINT", "EDIT", "SHARE"]).subscribe(val => {
            for (var param in val) {
                this.list.push({
                    title: val[param],
                    action: ""
                })
            }
        });

        this.list[0].action = "info"; 
        this.list[1].action = "fav";
        this.list[2].action = "use";
        this.list[3].action = "print";
        this.list[4].action = "edit";
        this.list[5].action = "share";

        if (this.navParams.get("img")) {
            this.img = this.navParams.get("img");
        }
    }

    close() {
        this.viewCtrl.dismiss();
    }

    goTo(item) {
        switch (item.action) {
            case "info":
                this.navCtrl.push('InfoPage', { img: this.img });
            break;

            case "use":
                var appMinimizer;
                var wallpaper;
                var toast;
                try {
                    appMinimizer = window["plugins"].appMinimize;
                    wallpaper = window["plugins"].wallpaper;
                    toast = window["plugins"].toast;
                    appMinimizer.minimize();
                    wallpaper.setImage(this.img.url);
                    toast.showWithOptions(
                        {
                            message: "Mi polla en tu boca",
                            duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
                            position: "bottom",
                            addPixelsY: -40  // added a negative value to move it up a bit (default 0)
                        }
                    );

                } catch (error) {
                    var newToast;
                    this.translate.get("ALERT_SUBTITLE").subscribe(val => {
                        newToast = this.toastCtrl.create({
                            message: val
                        });
                    });
                    newToast.present();
                    console.log(error);
                }
            break;

            case "share":
                var share;
                try {
                    console.log(this.img)
                    share = window["plugins"].socialsharing;
                    share.share(null, null, this.img.url);

                } catch (error) {
                    var toast;
                    this.translate.get("ALERT_SUBTITLE").subscribe(val => {
                        toast = this.toastCtrl.create({
                            message: val
                        });
                    });
                    toast.present();
                    console.log(error);
                }
            break;

            default:
                var toast;
                this.translate.get("COMING_SOON").subscribe(val => {
                    toast = this.toastCtrl.create({
                        message: val,
                        duration: 1500,
                        position: 'bottom',
                        cssClass: 'proximamenteToast'
                    });
                });
                toast.present();
            break;
        }
    }
}