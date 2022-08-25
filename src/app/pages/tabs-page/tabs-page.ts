import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AppUtilService } from '../../providers/app.util.service';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage implements OnInit{

  isAuthenticted : boolean

  constructor(private authFacade : AuthStoreFacade, private appUtilService : AppUtilService, private loadCtrl : LoadingController,
    private predictionFacade : PredictionStoreFacade){

  }

  ngOnInit(): void {
    this.appUtilService.setWhiteBgStatusBar();
    this.authFacade.authenticated$.subscribe((e)=>{
      this.isAuthenticted = e;
    });
  }

  ngOnDestroy() {
    // this.appUtilService.startAction(this.loadCtrl,  {content: `<span>Loading..</span>`});
  }


}
