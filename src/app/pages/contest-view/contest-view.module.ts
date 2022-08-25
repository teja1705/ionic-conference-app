import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContestViewPageRoutingModule } from './contest-view-routing.module';

import { ContestViewPage } from './contest-view.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { ContestLeaderboardComponent } from '../../components/contest-leaderboard/contest-leaderboard.component';
import { ContestWinningComponent } from '../../components/contest-winning/contest-winning.component';
import { ContestRulesComponent } from '../../components/contest-rules/contest-rules.component';
import { ShowPredictionComponent } from '../../components/show-prediction/show-prediction.component';
import { ScorecardComponent } from '../../components/scorecard/scorecard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContestViewPageRoutingModule,
    SuperTabsModule
  ],
  declarations: [ContestViewPage, ContestLeaderboardComponent, ContestWinningComponent,ShowPredictionComponent, ScorecardComponent, ContestRulesComponent],
  exports : [ContestLeaderboardComponent, ContestWinningComponent,ShowPredictionComponent, ScorecardComponent, ContestRulesComponent]
})
export class ContestViewPageModule {}
