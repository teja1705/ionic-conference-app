import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {SuperTabsConfig } from '@ionic-super-tabs/core'
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { Contest, ContestJoinedUsers } from '../../store/prediction.model';

@Component({
  selector: 'app-contest-view',
  templateUrl: './contest-view.page.html',
  styleUrls: ['./contest-view.page.scss'],
})
export class ContestViewPage implements OnInit {

  selectedContest : Contest = new Contest();


  constructor(private router : Router, private predictionFacade : PredictionStoreFacade) { 
    this.predictionFacade.selectedContest$.subscribe((e)=>{
      this.selectedContest = e;
    })
  }

  ngOnInit() {
  }

  backHome(){
    this.router.navigateByUrl('/contest');
  }

  config: SuperTabsConfig = {
   
    sideMenu: 'left',
    nativeSmoothScroll:true,
    allowElementScroll:true,
    debug:true,
    avoidElements: true,
    dragThreshold: 250
  };


}
