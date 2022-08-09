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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContestViewPageRoutingModule,
    SuperTabsModule
  ],
  declarations: [ContestViewPage, ContestLeaderboardComponent, ContestWinningComponent, ContestRulesComponent],
  exports : [ContestLeaderboardComponent, ContestWinningComponent, ContestRulesComponent]
})
export class ContestViewPageModule {}
