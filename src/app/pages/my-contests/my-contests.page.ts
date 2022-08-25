import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { Profile } from '../../store/auth/model';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { Contest, MatchInfo } from '../../store/prediction.model';

@Component({
  selector: 'app-my-contests',
  templateUrl: './my-contests.page.html',
  styleUrls: ['./my-contests.page.scss'],
})
export class MyContestsPage implements OnInit {

  contestList : Array<Contest>;
  selectedMatch : MatchInfo;
  profile : Profile

  constructor(private predictionFacade : PredictionStoreFacade, private modalCtrl : ModalController, private router : Router,
    private authFacade : AuthStoreFacade) { }

  ngOnInit() {
    this.predictionFacade.myContests$.subscribe((contest)=>{
      this.contestList = contest;
    })
    this.predictionFacade.selectedMatch$.subscribe((match)=>{
      this.selectedMatch = match;
    })
    this.authFacade.userProfile$.subscribe(p => {
      this.profile = p;
    })
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.predictionFacade.getMyMatchContests(this.selectedMatch.matchId, this.profile.login.userId);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  viewContestDashboard(contest : Contest){
    this.predictionFacade.getContestJoinedUsersAction(contest.id, this.profile.login.userId);
    this.router.navigateByUrl('/contest-view');
    this.predictionFacade.setSelectedContest(contest);
  }

}
