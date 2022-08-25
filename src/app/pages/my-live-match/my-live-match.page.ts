import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { Profile } from '../../store/auth/model';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { MatchInfo } from '../../store/prediction.model';

@Component({
  selector: 'app-my-live-match',
  templateUrl: './my-live-match.page.html',
  styleUrls: ['./my-live-match.page.scss'],
})
export class MyLiveMatchPage implements OnInit {

  public sportList : Array<MatchInfo>;

  profile : Profile = new Profile();

  constructor(private predictionFacade : PredictionStoreFacade, private router : Router, private authFacade : AuthStoreFacade) {
    this.predictionFacade.myLiveMathces$.subscribe((list)=>{
      this.sportList = list
    })
    this.authFacade.userProfile$.subscribe(p => {
      this.profile = p;
    })
   }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');

    this.predictionFacade.getMyMatches(this.profile.login.userId);
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
