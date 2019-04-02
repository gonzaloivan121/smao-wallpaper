import { Component } from '@angular/core';
import { Platform, LoadingController, LoadingOptions } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Events, App, AlertController } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any = TabsPage;
  toogleToolbar: boolean = true;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    translate: TranslateService,
    events: Events,
    app: App,
    loading: LoadingController,
    public alert: AlertController
  ) {
    var load = loading.create();
    load.present();

    // Get the language and set it for the translation
    var lang = navigator.language;
    lang = lang.split("-")[0];
    translate.setDefaultLang(lang);
    translate.use(lang);

    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("lang changed detected", event);
      translate.setDefaultLang(event.lang);
    });

    platform.ready().then(() => {
      var goBack = true;
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.backgroundColorByHexString('#28af50');
      statusBar.styleLightContent();
      splashScreen.hide();

      setTimeout(() => {
        load.dismiss();
        platform.registerBackButtonAction(() => {
          let nav = app.getActiveNavs()[0];
          let activeView = nav.getActive();

          console.log(activeView.name)
  
          if (activeView.name === "GalleryPage") {
            if (nav.canGoBack()) {
              nav.pop();
            } else {
              var alert;
              translate.get(["CLOSE_TITLE", "CLOSE_MESSAGE", "CLOSE_CANCEL", "CLOSE_ACCEPT"]).subscribe(val => {
                alert = this.alert.create({
                  title: val.CLOSE_TITLE,
                  message: val.CLOSE_MESSAGE,
                  buttons: [
                    {
                      text: val.CLOSE_CANCEL,
                      role: 'cancel',
                      handler: () => {
                        events.publish('app:exit', false);
                        goBack = true;
                      }
                    },
                    {
                      text: val.CLOSE_ACCEPT,
                      handler: () => {
                        events.publish('app:exit', true);
                        platform.exitApp() // Close the app
                      }
                    }
                  ]
                });
              });
              if (goBack) {
                alert.present();
                goBack = false;
              }
              
            }
          } else { // the actual page is not GalleryPage
            events.publish('app:backbuttonexit', false);
          }
        });
      }, 1000);      

      events.subscribe('tabs:toogle', toogle => {
        console.log(toogle)
        this.toogleToolbar = toogle;
        if (!this.toogleToolbar) {
          statusBar.hide();
        } else {
          statusBar.show();
        }
      });
    });
    
  }

}