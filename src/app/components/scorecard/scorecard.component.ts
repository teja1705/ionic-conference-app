import { Component, OnInit } from '@angular/core';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { MatchInfo, MatchScoreCard } from '../../store/prediction.model';

@Component({
  selector: 'app-scorecard',
  templateUrl: './scorecard.component.html',
  styleUrls: ['./scorecard.component.scss'],
})
export class ScorecardComponent implements OnInit {

  matchScoreCard : MatchScoreCard

  selectedMatch : MatchInfo

  constructor(private predictionFacade : PredictionStoreFacade) { 
    this.predictionFacade.matchScoreCard$.subscribe((e)=>{
      this.matchScoreCard = e;
    })
    this.predictionFacade.selectedMatch$.subscribe((e)=>{
      this.selectedMatch = e;
    })
  }

  ngOnInit() {}


  doRefresh(event) {
    console.log('Begin async operation');
    this.predictionFacade.getMatchScoreCard(this.selectedMatch.matchId);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
