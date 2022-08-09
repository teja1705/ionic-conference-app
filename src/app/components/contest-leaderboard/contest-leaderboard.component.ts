import { Component, OnInit } from '@angular/core';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { Contest, ContestJoinedUsers } from '../../store/prediction.model';

@Component({
  selector: 'app-contest-leaderboard',
  templateUrl: './contest-leaderboard.component.html',
  styleUrls: ['./contest-leaderboard.component.scss'],
})
export class ContestLeaderboardComponent implements OnInit {
  users : Array<ContestJoinedUsers>

  selectedContest : Contest = new Contest();

  constructor(private predictionFacade : PredictionStoreFacade) {
    this.predictionFacade.contestJoinedUsers$.subscribe((e)=>{
      this.users = e;
    })
    this.predictionFacade.selectedContest$.subscribe((e)=>{
      this.selectedContest = e;
    })
   }

  ngOnInit() {}

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
