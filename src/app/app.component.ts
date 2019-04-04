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
  
          if (activeView.name === "GalleryPage") {
            if (nav.canGoBack()) {
              nav.pop();
            } else {
              console.log('cant go back')
            }
          } else { // the actual page is not GalleryPage
            console.log('!galleryPage')
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