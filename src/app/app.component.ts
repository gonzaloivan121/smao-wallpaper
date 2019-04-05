import { Component, ViewChild } from '@angular/core';
import { Platform, LoadingController, MenuController, AlertController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = TabsPage;
  toogleToolbar: boolean = true;

  pages: object[] = [
    { title: 'WELCOME', component: 'WelcomePage', icon: '' },
    { title: 'HOME', component: 'TabsPage', icon: '' },
    { title: 'ABOUT', component: 'AboutPage', icon: '' },
    { title: 'CONTACT', component: 'ContactPage', icon: '' },
    { title: 'SETTINGS', component: 'SettingsPage', icon: '' },
    { title: 'EXIT', component: 'ExitPage', icon: '' }
  ]

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    translate: TranslateService,
    loading: LoadingController,
    public alert: AlertController,
    public menu: MenuController
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
      }, 1000);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    console.log(this.nav.getActive().component)
    if (this.nav.getActive().component == page.component) {
      this.nav.push(page.component);
    } else {
      console.log('==')
    }
    this.menu.close();
  }

}