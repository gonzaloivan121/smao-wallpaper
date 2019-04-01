import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GalleryComponent } from './gallery';

@NgModule({
  declarations: [
    GalleryComponent,
   ],
  imports: [
    IonicModule,
  ],
  exports: [
    GalleryComponent
  ],
  entryComponents:[
    GalleryComponent
  ]
})
export class GalleryComponentModule {}