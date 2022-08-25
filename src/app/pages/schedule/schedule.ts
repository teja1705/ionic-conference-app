import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonList } from '@ionic/angular';
import { SuperTabs } from '@ionic-super-tabs/angular';
import { UpcomingPage } from '../upcoming/upcoming.page';
import { LivePage } from '../live/live.page';
import { HistoryPage } from '../history/history.page';
import { SuperTabsConfig } from '@ionic-super-tabs/core';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';
import { Coins } from '../../store/prediction.model';
import { AuthStoreFacade } from '../../store/auth/auth-store.facade';



@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html',
  styleUrls: ['./schedule.scss'],
})
export class SchedulePage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('scheduleList', { static: true }) scheduleList: IonList;

  ios: boolean;
  dayIndex = 0;
  queryText = '';
  segment = 'upcoming';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
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

  coins : Coins


  tabs = [
    { pageName: UpcomingPage, title: 'Upcoming',id: 'upcomingPage'},
    { pageName: LivePage, title: 'Live', id: 'livePage'},
    { pageName: HistoryPage, title: 'History', id: 'historyPage'}

    ];   

  constructor(
    private authFacade : AuthStoreFacade,
    public router: Router,
    private predictionFacade : PredictionStoreFacade
  ) { }

  isAuthenticated : boolean

  ngOnInit() {
    this.tabsLoaded = true;
    this.predictionFacade.coins$.subscribe((e)=>{
      this.coins = e;
    })
    this.authFacade.authenticated$.subscribe((e)=>{
      this.isAuthenticated = e;
    })
  }

  onTabSelect(ev: any) {
    this.selectedTabIndex = ev.index;
    } 


}
