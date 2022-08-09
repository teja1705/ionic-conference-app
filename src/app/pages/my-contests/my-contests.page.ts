import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { Contest } from '../../store/prediction.model';

@Component({
  selector: 'app-my-contests',
  templateUrl: './my-contests.page.html',
  styleUrls: ['./my-contests.page.scss'],
})
export class MyContestsPage implements OnInit {

  contestList : Array<Contest>;

  constructor(private predictionFacade : PredictionStoreFacade, private modalCtrl : ModalController, private router : Router) { }

  ngOnInit() {
    this.predictionFacade.myContests$.subscribe((contest)=>{
      this.contestList = contest;
    })
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
