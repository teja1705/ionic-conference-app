import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPredictionsPageRoutingModule } from './my-predictions-routing.module';

import { MyPredictionsPage } from './my-predictions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPredictionsPageRoutingModule
  ],
  declarations: [MyPredictionsPage]
})
export class MyPredictionsPageModule {}
