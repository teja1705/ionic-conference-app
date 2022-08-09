import { Component, OnInit } from '@angular/core';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { CricketMatchHomePageInfo } from '../../store/prediction.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  public sportList : Array<CricketMatchHomePageInfo>;

  constructor(private predictionFacade : PredictionStoreFacade) {
    this.predictionFacade.homePageHistoryMatches$.subscribe((list)=>{
      this.sportList = list
    })
   }

  ngOnInit() {
    this.predictionFacade.getHomePageHistoryMatches("CRICKET", "123");
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
