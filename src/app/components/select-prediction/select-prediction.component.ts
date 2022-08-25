import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { MatchInfo, PredictionInput, PredictionItem } from '../../store/prediction.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-select-prediction',
  templateUrl: './select-prediction.component.html',
  styleUrls: ['./select-prediction.component.scss'],
})
export class SelectPredictionComponent implements OnInit {

  public predictions : Array<PredictionInput>
  selectedPredictionItem : PredictionInput = new PredictionInput();

  selectedMatch : MatchInfo

  constructor(private modalCtrl : ModalController, private predictionFacade : PredictionStoreFacade) { 
    this.predictionFacade.myPredictions$.subscribe((e)=>{
      debugger
      this.predictions = e;
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

  confirm() {
    return this.modalCtrl.dismiss(this.selectedPredictionItem, 'confirm');
  }

  selectedPrediction($event){
    let index = _.findIndex(this.predictions, (e : PredictionInput) => {
      return e.predictionGroup.id == $event.target.value;
    }, 0);

    this.selectedPredictionItem = this.predictions[index];
  }

}
