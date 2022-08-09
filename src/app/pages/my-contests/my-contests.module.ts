import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyContestsPageRoutingModule } from './my-contests-routing.module';

import { MyContestsPage } from './my-contests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyContestsPageRoutingModule
  ],
  declarations: [MyContestsPage]
})
export class MyContestsPageModule {}
