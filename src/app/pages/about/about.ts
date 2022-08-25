import { Component, OnInit, ViewChild } from '@angular/core';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { SuperTabsConfig } from '@ionic-super-tabs/core';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';
import { Profile } from '../../store/auth/model';
import { Coins } from '../../store/prediction.model';
import { MyUpcomingMatchPage } from '../my-upcoming-match/my-upcoming-match.page';
import { MyLiveMatchPage } from '../my-live-match/my-live-match.page';
import { MyHistoryMatchPage } from '../my-history-match/my-history-match.page';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  styleUrls: ['./about.scss'],
})
export class AboutPage implements OnInit{

   ios: boolean;
   showSearchbar: boolean;
   tabsLoaded:boolean = false;
   selectedTabIndex = 0;
   upcomingPage = MyUpcomingMatchPage;
   livePage = MyLiveMatchPage;
   historyPage = MyHistoryMatchPage;
   @ViewChild(SuperTabs) superTabs: SuperTabs;
 
   opts = {
     icon: false,
     label: true,
     toolbarPos: 'top',
     scrollable: true,
   };
 
   configure: SuperTabsConfig = {
     debug: true,
     allowElementScroll: false,
   };
 
 
   tabs = [
     { pageName: MyUpcomingMatchPage, title: 'Upcoming',id: 'upcomingPage'},
     { pageName: MyLiveMatchPage, title: 'Live', id: 'livePage'},
     { pageName: MyHistoryMatchPage, title: 'History', id: 'historyPage'}
 
     ];   

    profile : Profile
    coins : Coins
    isAuthenticated : boolean
 
   constructor(private predictionFacade : PredictionStoreFacade, private authFacade : AuthStoreFacade) { 

    this.authFacade.userProfile$.subscribe((e)=>{
      this.profile = e;
    })
    this.predictionFacade.coins$.subscribe((e)=>{
      this.coins = e;
    })
    this.authFacade.authenticated$.subscribe((e)=>{
      this.isAuthenticated = e;
    })
   }
 
   ngOnInit() {
    this.predictionFacade.getMyMatches(this.profile.login.userId);
   }
 
   onTabSelect(ev: any) {
     this.selectedTabIndex = ev.index;
     } 


}
