import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { Prediction } from '../../store/prediction.model';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements OnInit {

  predictions : Array<Prediction>;
  totalPointsPredictedFor : any = 0;

  constructor(private predictionFacade : PredictionStoreFacade, private modalCtrl : ModalController) { 
    this.predictionFacade.predictionSet$.subscribe((e)=>{
      this.predictions = e;
    })
  }

  ngOnInit() {
    this.predictions.map((e)=>{
      this.totalPointsPredictedFor = this.totalPointsPredictedFor + e.predictPoints;
    })
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

}
