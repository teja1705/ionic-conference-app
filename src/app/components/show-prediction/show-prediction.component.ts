import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { MatchInfo, Prediction, PredictionInput } from '../../store/prediction.model';

@Component({
  selector: 'app-show-prediction',
  templateUrl: './show-prediction.component.html',
  styleUrls: ['./show-prediction.component.scss'],
})
export class ShowPredictionComponent implements OnInit {

  predictionItem : PredictionInput;
  selectedMatch : MatchInfo

  constructor(private predictionFacade : PredictionStoreFacade, private modalCtrl : ModalController) { 
    this.predictionFacade.unknownPrediction$.subscribe((e)=>{
      this.predictionItem = e;
    })
    this.predictionFacade.selectedMatch$.subscribe((match)=>{
      this.selectedMatch = match;
    })
  }

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
