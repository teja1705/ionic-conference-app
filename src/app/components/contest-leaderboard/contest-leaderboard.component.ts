import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { Profile } from '../../store/auth/model';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { Contest, ContestJoinedUsers } from '../../store/prediction.model';
import { ShowPredictionComponent } from '../show-prediction/show-prediction.component';

@Component({
  selector: 'app-contest-leaderboard',
  templateUrl: './contest-leaderboard.component.html',
  styleUrls: ['./contest-leaderboard.component.scss'],
})
export class ContestLeaderboardComponent implements OnInit {
  users : Array<ContestJoinedUsers>

  selectedContest : Contest = new Contest();
  profile : Profile

  constructor(private predictionFacade : PredictionStoreFacade, private authFacade : AuthStoreFacade,
    private modalCtrl : ModalController) {
    this.predictionFacade.contestJoinedUsers$.subscribe((e)=>{
      this.users = e;
    })
    this.predictionFacade.selectedContest$.subscribe((e)=>{
      this.selectedContest = e;
    })
    this.authFacade.userProfile$.subscribe((e)=>{
      this.profile = e;
    })
   }

  ngOnInit() {}

  doRefresh(event) {
    console.log('Begin async operation');
    this.predictionFacade.getContestJoinedUsersAction(this.selectedContest.id, this.profile.login.userId);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  async previewPrediction(user : ContestJoinedUsers){
    debugger
    this.predictionFacade.getUnknownUserPrediction(user.predictionGroupId);
    const modal = await this.modalCtrl.create({
      component: ShowPredictionComponent,
      cssClass: 'prediction-preview'
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if(role === 'confirm') {
    }
  }

}
