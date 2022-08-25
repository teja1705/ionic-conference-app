import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { Profile } from '../../store/auth/model';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { CricketMatchHomePageInfo, MatchInfo } from '../../store/prediction.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  public sportList : Array<CricketMatchHomePageInfo>;
  profile : Profile = new Profile();


  constructor(private predictionFacade : PredictionStoreFacade, private router : Router, private authFacade : AuthStoreFacade) {
    this.predictionFacade.homePageHistoryMatches$.subscribe((list)=>{
      this.sportList = list
    })
    this.authFacade.userProfile$.subscribe(p => {
      this.profile = p;
    })
   }

  ngOnInit() {
    this.predictionFacade.getHomePageHistoryMatches("CRICKET");
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.predictionFacade.getHomePageHistoryMatches("CRICKET");

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async moveToContests(match : MatchInfo){
    this.predictionFacade.setSelectedMatch(match);
    this.predictionFacade.getMatchContests(match.matchId, this.profile.login.userId);
      this.router.navigateByUrl('/contest');
    }

}
