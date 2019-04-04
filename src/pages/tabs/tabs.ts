import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, NavParams, PopoverController, Platform } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';
import { PopoverPage } from './popover/popover';
import { StatusBar } from '@ionic-native/status-bar';


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
  tabsClass = "";
  img;

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public events: Events,
    public platform: Platform,
    public popoverCtrl: PopoverController,
    public statusBar: StatusBar
  ) {
    this.pages.forEach(page => {
      this.translate.get(page.title).subscribe(val => {
        page.title = val;
      });
    });
    
    events.subscribe('app:backbuttonexit', (allowed) => {
      if (!allowed) {
        this.onTabSelect(null);
      }
    });

    events.subscribe('tabs:hide', () => {
      this.tabsClass = "tabsHidden";
      this.superTabs.enableTabsSwipe(false);
    });

    events.subscribe('tabs:show', () => {
      this.tabsClass = "";
      this.superTabs.enableTabsSwipe(true);
    });

    events.subscribe('tabs:slide', () => {
      this.tabsClass = "";
      this.showTab = true;
      this.superTabs.showToolbar(true);
      this.statusBar.show();
    });

    events.subscribe('img:view', (image) => {
      this.img = image;
    });
  }

  ngOnInit() {
    
  }

  ionViewDidLoad() {
    
  }

  menu(event) {
    var popover = this.popoverCtrl.create(PopoverPage, { img: this.img });
    popover.present({
      ev: event
    });
  }

  toogleToolbar() {
    this.showTab = !this.showTab;
    this.superTabs.showToolbar(this.showTab);
    this.events.publish('tabs:toogle', this.showTab);
    if (this.showTab) {
      this.events.publish('tabs:show');
    } else {
      this.events.publish('tabs:hide');
    }
    this.superTabs.enableTabSwipe('galleryTab', !this.showTab);
  }

  onTabSelect(ev?: any) {
    if (this.superTabs.getActiveTab) {
      this.superTabs.getActiveTab().goToRoot({
        id: 'galleryTab'
      });
    }
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