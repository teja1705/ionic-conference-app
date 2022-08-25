import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { Profile } from '../../store/auth/model';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { MatchInfo, PredictionInput, PredictionItem } from '../../store/prediction.model';

@Component({
  selector: 'app-my-predictions',
  templateUrl: './my-predictions.page.html',
  styleUrls: ['./my-predictions.page.scss'],
})
export class MyPredictionsPage implements OnInit {


  myPredictions : Array<PredictionInput>;

  selectedMatch : MatchInfo

  profile : Profile

  constructor(private predictionFacade : PredictionStoreFacade, private allertController : AlertController, private router : Router,
    private authFacade : AuthStoreFacade) { 
    this.predictionFacade.myPredictions$.subscribe((prediction)=>{
      this.myPredictions = prediction;
    })

    this.predictionFacade.selectedMatch$.subscribe((prediction)=>{
      this.selectedMatch = prediction;
    })
    this.authFacade.userProfile$.subscribe(p => {
      this.profile = p;
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

  editPrediction(prediction : PredictionInput){
    this.predictionFacade.editPredictionAction(prediction);
    this.router.navigateByUrl('/create-prediction');
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.predictionFacade.getMyPredictions(this.selectedMatch.matchId, this.profile.login.userId);
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
