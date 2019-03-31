import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, NavParams, AlertController } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  pages = [
    { pageName: 'AboutPage', title: 'ABOUT', icon: 'help-circle', id: 'aboutTab' },
    { pageName: 'GalleryPage', title: 'GALLERY', icon: 'body', id: 'galleryTab' },
    { pageName: 'ContactPage', title: 'CONTACT', icon: 'contacts', id: 'contactTab' }
  ];

  selectedTab = 0;

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public translate: TranslateService
  ) {
    this.pages.forEach(page => {
      this.translate.get(page.title).subscribe(val => {
        page.title = val;
      });
    });
  }

  onTabSelect(ev: any) {
    this.selectedTab = ev.index;
    this.superTabs.clearBadge(this.pages[ev.index].id);
  }

}