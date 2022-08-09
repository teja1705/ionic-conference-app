import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PlayerListComponent } from './player-list.component';
import { PredictPlayerScoreComponent } from '../predict-player-score/predict-player-score.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [PlayerListComponent, PredictPlayerScoreComponent],
  exports:[PlayerListComponent]
})
export class PlayerListComponentModule {}
