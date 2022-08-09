import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContestListPageRoutingModule } from './contest-list-routing.module';

import { ContestListPage } from './contest-list.page';
import { SelectPredictionComponent } from '../../components/select-prediction/select-prediction.component';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContestListPageRoutingModule,
    SuperTabsModule
  ],
  declarations: [ContestListPage, SelectPredictionComponent],
  exports : [SelectPredictionComponent]
})
export class ContestListPageModule {}
