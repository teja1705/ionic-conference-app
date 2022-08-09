import { Component, OnInit, ViewChild } from '@angular/core';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { HistoryPage } from '../history/history.page';
import { LivePage } from '../live/live.page';
import { UpcomingPage } from '../upcoming/upcoming.page';
import { SuperTabsConfig } from '@ionic-super-tabs/core';


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
   upcomingPage = UpcomingPage;
   livePage = LivePage;
   historyPage = HistoryPage;
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
     { pageName: UpcomingPage, title: 'Upcoming',id: 'upcomingPage'},
     { pageName: LivePage, title: 'Live', id: 'livePage'},
     { pageName: HistoryPage, title: 'History', id: 'historyPage'}
 
     ];   
 
   constructor(
   ) { }
 
   ngOnInit() {
   }
 
   onTabSelect(ev: any) {
     this.selectedTabIndex = ev.index;
     } 


}
