import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverPage } from './popover';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        PopoverPage
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(PopoverPage),
        TranslateModule.forChild()
    ],
})
export class PopoverPageModule { }