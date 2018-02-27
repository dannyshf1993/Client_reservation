import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestsPage } from './guests';

@NgModule({
  declarations: [
    GuestsPage,
  ],
  imports: [
    IonicPageModule.forChild(GuestsPage),
  ],
})
export class GuestsPageModule {}
