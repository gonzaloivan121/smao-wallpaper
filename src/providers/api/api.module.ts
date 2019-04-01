import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ApiProvider } from './api';

@NgModule({
  declarations: [
    ApiProvider,
   ],
  imports: [
    IonicModule,
  ],
  exports: [
    ApiProvider
  ],
  entryComponents:[
    ApiProvider
  ]
})
export class ApiProviderModule {}