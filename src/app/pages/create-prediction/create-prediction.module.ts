import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePredictionPageRoutingModule } from './create-prediction-routing.module';

import { CreatePredictionPage } from './create-prediction.page';
import { PlayerListComponentModule } from '../../components/player-list/player-list.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { TimerComponentModule } from '../../components/timer/timer.component.module';
import { PreviewComponent } from '../../components/preview/preview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePredictionPageRoutingModule,
    PlayerListComponentModule,
    SuperTabsModule,
    TimerComponentModule
  ],
  declarations: [CreatePredictionPage, PreviewComponent],
  exports : [PreviewComponent]
})
export class CreatePredictionPageModule {}
