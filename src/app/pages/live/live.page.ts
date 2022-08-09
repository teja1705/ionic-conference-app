import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { Contest, CricketMatchHomePageInfo } from '../../store/prediction.model';

@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit {

  public sportList : Array<CricketMatchHomePageInfo>;

  constructor(private predictionFacade : PredictionStoreFacade, private router : Router) {
    this.predictionFacade.homePageLiveMatches$.subscribe((list)=>{
      this.sportList = list
    })
   }

  ngOnInit() {
    this.predictionFacade.getHomePageLiveMatches("CRICKET", "123");
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  viewContestDashboard(contest : Contest){
    this.predictionFacade.getContestJoinedUsersAction(contest.id);
    this.router.navigateByUrl('/contest-view');
    this.predictionFacade.setSelectedContest(contest);
  }


}
