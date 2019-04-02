import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, IonicPage, NavParams, AlertController, Platform } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  
  pages = [
    { pageName: 'GalleryPage', title: 'GALLERY', icon: 'body', id: 'galleryTab' },
    { pageName: 'AboutPage', title: 'ABOUT', icon: 'help-circle', id: 'aboutTab' },
    { pageName: 'ContactPage', title: 'CONTACT', icon: 'contacts', id: 'contactTab' }
  ];

  selectedTab = 0;
  showTab = true;

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public events: Events,
    public platform: Platform
  ) {
    this.pages.forEach(page => {
      this.translate.get(page.title).subscribe(val => {
        page.title = val;
      });
    });
    
    this.platform.ready().then((ready) => {
      events.subscribe('app:backbuttonexit', (allowed) => {
        if (!allowed) {
          this.onTabSelect(null);
        }
      });
    });
  }

  ngOnInit() {
    
  }

  ionViewDidLoad() {
    //this.superTabs.enableTabSwipe('galleryTab', true);
  }

  toogleToolbar() {
    this.showTab = !this.showTab;
    this.superTabs.showToolbar(this.showTab);
    this.events.publish('tabs:toogle', this.showTab);
  }

  onTabSelect(ev?: any) {
    if (ev != null) {
      this.selectedTab = ev.index;
      this.superTabs.clearBadge(this.pages[ev.index].id);
    } else {
      this.selectedTab = 0;
      this.superTabs.clearBadge(this.pages[0].id);
      this.superTabs.slideTo(this.selectedTab);
    }
    
  }

}