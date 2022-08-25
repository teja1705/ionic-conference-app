import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AppUtilService } from '../../providers/app.util.service';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { Profile } from '../../store/auth/model';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { MatchInfo, StatusOfMatch } from '../../store/prediction.model';

@Component({
  selector: 'app-my-upcoming-match',
  templateUrl: './my-upcoming-match.page.html',
  styleUrls: ['./my-upcoming-match.page.scss'],
})
export class MyUpcomingMatchPage implements OnInit {

  public sportList : Array<MatchInfo>;
  profile : Profile = new Profile();


  constructor(private predictionFacade : PredictionStoreFacade, private router : Router, public alertCtrl: AlertController,
    public toastCtrl: ToastController, private authFacade : AuthStoreFacade,
    private appUtilService : AppUtilService,
    private loadCtrl : LoadingController) {
    this.predictionFacade.myUpcomingMathces$.subscribe((list)=>{
      this.sportList = list
    })
    this.authFacade.userProfile$.subscribe(p => {
      this.profile = p;
    })
   }


  ngOnInit() {
    this.predictionFacade.getMyMatches(this.profile.login.userId);
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

    this.predictionFacade.getMyMatches(this.profile.login.userId);

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
