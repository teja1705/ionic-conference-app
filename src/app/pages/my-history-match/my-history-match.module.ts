import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyHistoryMatchPageRoutingModule } from './my-history-match-routing.module';

import { MyHistoryMatchPage } from './my-history-match.page';
import { TimerComponentModule } from '../../components/timer/timer.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyHistoryMatchPageRoutingModule,
    TimerComponentModule

  ],
  declarations: [MyHistoryMatchPage]
})
export class MyHistoryMatchPageModule {}
