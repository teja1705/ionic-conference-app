import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyUpcomingMatchPageRoutingModule } from './my-upcoming-match-routing.module';

import { MyUpcomingMatchPage } from './my-upcoming-match.page';
import { TimerComponentModule } from '../../components/timer/timer.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyUpcomingMatchPageRoutingModule,
    TimerComponentModule
  ],
  declarations: [MyUpcomingMatchPage]
})
export class MyUpcomingMatchPageModule {}
