import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryPage } from './gallery';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        GalleryPage
    ],
    imports: [
        ComponentsModule,
        IonicPageModule.forChild(GalleryPage),
        TranslateModule.forChild()
    ],
})
export class GalleryPageModule {}