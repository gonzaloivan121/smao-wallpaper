import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        TabsPage,
        TranslateModule
    ],
    imports: [
        IonicPageModule.forChild(TabsPage),
        SuperTabsModule
    ],
})
export class TabsPageModule { }