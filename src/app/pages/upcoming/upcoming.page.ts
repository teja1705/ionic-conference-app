import { Component, OnInit } from '@angular/core';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { CricketMatchHomePageInfo, MatchInfo, StatusOfMatch } from '../../store/prediction.model';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {

  public sportList : Array<CricketMatchHomePageInfo>;


  constructor(private predictionFacade : PredictionStoreFacade, private router : Router, public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.predictionFacade.homePageUpcomingMatches$.subscribe((list)=>{
      this.sportList = list
    })
   }


  ngOnInit() {
    this.predictionFacade.getHomePageUpcomingMatches("CRICKET", "123");
  }

  moveToLive($event){
    this.predictionFacade.moveMatchToLiveList($event.date, $event.id);
  }

  async moveToContests(match : MatchInfo){
    this.predictionFacade.setSelectedMatch(match);
    if(match.status !== StatusOfMatch.ON_GOING && match.status !== StatusOfMatch.FINISHED){
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

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}