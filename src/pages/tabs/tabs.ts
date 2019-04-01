import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, IonicPage, NavParams, AlertController } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  config = {
    pageName: 'GalleryPage',
    title: 'GALLERY',
    icon: 'body',
    id: 'galleryTab'
  };
  
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
    public alertCtrl: AlertController,
    public translate: TranslateService
  ) {
    this.pages.forEach(page => {
      this.translate.get(page.title).subscribe(val => {
        page.title = val;
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
  }

  onTabSelect(ev: any) {
    var top = window.pageYOffset || document.documentElement.scrollTop,
      left = window.pageXOffset || document.documentElement.scrollLeft;
    if (top > 0) {
      
    }
    console.log(ev)
    this.selectedTab = ev.index;
    this.superTabs.clearBadge(this.pages[ev.index].id);
  }

}