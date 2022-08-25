import { Component, OnInit } from '@angular/core';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { CricketMatchHomePageInfo, MatchInfo, StatusOfMatch } from '../../store/prediction.model';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { Profile } from '../../store/auth/model';
import { AppUtilService } from '../../providers/app.util.service';


@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {

  public sportList : Array<CricketMatchHomePageInfo>;
  profile : Profile = new Profile();


  constructor(private predictionFacade : PredictionStoreFacade, private router : Router, public alertCtrl: AlertController,
    public toastCtrl: ToastController, private authFacade : AuthStoreFacade,
    private appUtilService : AppUtilService,
    private loadCtrl : LoadingController) {
    this.predictionFacade.homePageUpcomingMatches$.subscribe((list)=>{
      this.sportList = list
    })
    this.authFacade.userProfile$.subscribe(p => {
      this.profile = p;
    })
   }


  ngOnInit() {
    this.predictionFacade.getHomePageUpcomingMatches("CRICKET");
  }

  moveToLive($event){
    this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Loading..</span>`});
    this.predictionFacade.moveMatchToLiveList($event.date, $event.id);
  }

  async moveToContests(match : MatchInfo){
    this.predictionFacade.setSelectedMatch(match);
    this.predictionFacade.getMatchContests(match.matchId, this.profile.login.userId);
    if(match.status !== StatusOfMatch.ON_GOING && match.status !== StatusOfMatch.COMPLETED){
      this.router.navigateByUrl('/contest');
    }
    else{
      const toast = await this.toastCtrl.create({
        message: 'This match is ongoing',
        duration: 3000
      });
      await toast.present();
    }
  }

  doRefresh(event) {
    console.log('Begin async operation');

    this.predictionFacade.getHomePageUpcomingMatches("CRICKET");
    if(this.profile.login.userId){
      this.predictionFacade.getMyCoins(this.profile.login.userId);
    }

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}