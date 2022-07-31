import { Component, OnInit } from '@angular/core';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { CricketMatchHomePageInfo } from '../../store/prediction.model';

@Component({
  selector: 'app-live',
  templateUrl: './live.page.html',
  styleUrls: ['./live.page.scss'],
})
export class LivePage implements OnInit {

  public sportList : Array<CricketMatchHomePageInfo>;

  constructor(private predictionFacade : PredictionStoreFacade) {
    this.predictionFacade.homePageLiveMatches$.subscribe((list)=>{
      this.sportList = list
    })
   }

  ngOnInit() {
    this.predictionFacade.getHomePageLiveMatches();
  }

}
