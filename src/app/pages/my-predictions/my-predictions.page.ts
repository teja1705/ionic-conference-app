import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { PredictionItem } from '../../store/prediction.model';

@Component({
  selector: 'app-my-predictions',
  templateUrl: './my-predictions.page.html',
  styleUrls: ['./my-predictions.page.scss'],
})
export class MyPredictionsPage implements OnInit {

  imageLink : string = "https://www.google.com/imgres?imgurl=https%3A%2F%2Flookaside.instagram.com%2Fseo%2Fgoogle_widget%2Fcrawler%2F%3Fmedia_id%3D2842132627112512452&imgrefurl=https%3A%2F%2Fwww.instagram.com%2Fjrntr%2F&tbnid=JBjcU_8edptwzM&vet=12ahUKEwiFtNiPhqX5AhX6_3MBHY0vB9IQMygEegUIARDkAQ..i&docid=PFK9mHtbTt-1TM&w=1440&h=1797&q=jrntr&ved=2ahUKEwiFtNiPhqX5AhX6_3MBHY0vB9IQMygEegUIARDkAQ";

  myPredictions : Array<PredictionItem>;

  constructor(private predictionFacade : PredictionStoreFacade, private allertController : AlertController, private router : Router) { 
    this.predictionFacade.myPredictions$.subscribe((prediction)=>{
      this.myPredictions = prediction;
    })
  }

  ngOnInit() {

  }

  async deletePredictionAlert(prediction : PredictionItem) {
    const alert = await this.allertController.create({
      header: 'You are about to delete this prediction',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => { 
              this.predictionFacade.deletePredictionAction(prediction.id);
            }
        }
      ]
    });
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
    // console.log(this.predictionItem.predictions);
  }

  editPrediction(prediction : PredictionItem){
    this.predictionFacade.editPredictionAction(prediction);
    this.router.navigateByUrl('/create-prediction');
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
