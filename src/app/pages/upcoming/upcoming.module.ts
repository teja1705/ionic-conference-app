import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpcomingPageRoutingModule } from './upcoming-routing.module';

import { UpcomingPage } from './upcoming.page';
import { TimerComponentModule } from '../../components/timer/timer.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpcomingPageRoutingModule,
    TimerComponentModule
  ],
  declarations: [UpcomingPage],
  providers : []
})
export class UpcomingPageModule {}
