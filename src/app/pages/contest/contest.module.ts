import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContestPageRoutingModule } from './contest-routing.module';

import { ContestPage } from './contest.page';
import { TimerComponentModule } from '../../components/timer/timer.component.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContestPageRoutingModule,
    TimerComponentModule,
    SuperTabsModule
  ],
  declarations: [ContestPage],
  providers:[]
})
export class ContestPageModule {}
