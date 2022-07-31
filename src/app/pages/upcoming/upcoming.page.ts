import { Component, OnInit } from '@angular/core';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { CricketMatchHomePageInfo } from '../../store/prediction.model';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.page.html',
  styleUrls: ['./upcoming.page.scss'],
})
export class UpcomingPage implements OnInit {

  public sportList : Array<CricketMatchHomePageInfo>;

  constructor(private predictionFacade : PredictionStoreFacade) {
    this.predictionFacade.homePageUpcomingMatches$.subscribe((list)=>{
      this.sportList = list
    })
   }

  ngOnInit() {
    this.predictionFacade.getHomePageUpcomingMatches();
  }

}
