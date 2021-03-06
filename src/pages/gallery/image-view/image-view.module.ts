import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImageViewPage } from './image-view';
import { ComponentsModule } from '../../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';
import { ZoomAreaModule } from 'ionic2-zoom-area';

@NgModule({
    declarations: [
        ImageViewPage
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(ImageViewPage),
        TranslateModule.forChild(),
        ZoomAreaModule
    ],
})
export class ImageViewPageModule { }