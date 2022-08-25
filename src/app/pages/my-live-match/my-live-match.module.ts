import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyLiveMatchPageRoutingModule } from './my-live-match-routing.module';

import { MyLiveMatchPage } from './my-live-match.page';
import { TimerComponentModule } from '../../components/timer/timer.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyLiveMatchPageRoutingModule,
    TimerComponentModule

  ],
  declarations: [MyLiveMatchPage]
})
export class MyLiveMatchPageModule {}
