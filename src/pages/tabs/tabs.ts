import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, NavParams, Platform, MenuController } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { TranslateService } from '@ngx-translate/core';
import { Events } from 'ionic-angular';
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
  toogleMenu: boolean = false;
  img;

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService,
    public events: Events,
    public platform: Platform,
    public statusBar: StatusBar,
    public menuCtrl: MenuController
  ) {
    this.pages.forEach(page => {
      this.translate.get(page.title).subscribe(val => {
        page.title = val;
      });
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

  toogleSideMenu() {
    this.menuCtrl.open();
  }

  onTabSelect(ev?: any) {    
    if (this.superTabs.getActiveTab().root == "GalleryPage" ) {
      this.events.publish('goTo:top');
      console.log('entrando en galeria')
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