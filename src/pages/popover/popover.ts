import { Component } from '@angular/core';
import { ViewController, NavController, ToastController, Events, NavParams, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { File } from '@ionic-native/file'; 

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
        public platform: Platform,
        public file: File
    ) {
        translate.get(["INFO", "ADD_FAVOURITES", "USE_AS", "SAVE", "PRINT", "EDIT", "SHARE"]).subscribe(val => {
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
        this.list[3].action = "save";
        this.list[4].action = "print";
        this.list[5].action = "edit";
        this.list[6].action = "share";

        if (this.navParams.get("img")) {
            this.img = this.navParams.get("img");
        }
    }

    closePopover() {
        this.viewCtrl.dismiss();
    }

    goTo(item) {
        switch (item.action) {
            case "info":
                this.navCtrl.push('InfoPage', { img: this.img });
                this.closePopover();
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
                    setTimeout(() => {
                        newToast.dismiss();
                    }, 1500);
                }
                this.closePopover();
            break;

            case "save":
                if (this.platform.is('cordova')) {
                    this.file.checkDir("file:///storage/emulated/0/", "Pictures").then(pictures => {
                        this.file.checkDir("file:///storage/emulated/0/Pictures", "SMAO").then(smao => {
                            this.file.createFile("file:///storage/emulated/0/Pictures/SMAO", this.img.metadata.filename, true).then(fileEntry => {
                                console.log(fileEntry)
                            });
                        }).catch(err => {
                            this.file.createDir("file:///storage/emulated/0/Pictures", "SMAO", false).then(fullfilled => {
                                
                            }).catch(err => {
                                
                            })
                        });
                    });
                } else {
                    var toast;
                    this.translate.get("ALERT_SUBTITLE").subscribe(val => {
                        toast = this.toastCtrl.create({
                            message: val
                        });
                    });
                    toast.present();
                    setTimeout(() => {
                        toast.dismiss();
                    }, 1500);
                }
                this.closePopover();
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
                    setTimeout(() => {
                        toast.dismiss();
                    }, 1500);
                }
                this.closePopover();
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
                this.closePopover();
            break;
        }
    }
}