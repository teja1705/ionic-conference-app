import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription, ReplaySubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'webstomp-client';
import { ReceivedNotification, Message } from '../../store/prediction.model';
import { PredictionStoreFacade } from '../../store/prediction-store.facade';

@Injectable({ providedIn: 'root' })
export class TrackerService {
  private stompClient: Stomp.Client | null = null;
  private routerSubscription: Subscription | null = null;
  private connectionSubject: ReplaySubject<void> = new ReplaySubject(1);
  private userConnectionSubject: ReplaySubject<void> = new ReplaySubject(1);
  private connectionSubscription: Subscription | null = null;
  private userConnectionSubscription: Subscription | null = null;
  private stompSubscription: Stomp.Subscription | null = null;
  private userStompSubscription: Stomp.Subscription | null = null;
  private listenerSubject: Subject<ReceivedNotification> = new Subject();
  private userListenerSubject: Subject<ReceivedNotification> = new Subject();

  constructor(
                private router: Router,
                private predictionFacade : PredictionStoreFacade
              ) {

              }

  connect(token: string): void {
    
    if (this.stompClient?.connected) {
      return;
    }

    // building absolute path so that websocket doesn't fail when deploying with a context path
    // let url = 'http://ec2-44-203-119-180.compute-1.amazonaws.com:8080/guruwebsocket';
    let url = 'http://97.74.93.142:8080/guruwebsocket';
    // let url = 'http://localhost:8080/guruwebsocket';
    // url = this.location.prepareExternalUrl(url);
    const authToken: string = window.localStorage.getItem('six-authToken');
    // // const token: string = this.storageService.getItem('authToken');
    // let tempToken = authToken.replace("\\", "").replace("\\", "");
    // let currentToken = tempToken.replace("\"", "").replace("\"", "");
    // const authToken = this.authServerProvider.getToken();
    if (authToken) {
      url += '?access_token=' + authToken;
    }
    const socket: WebSocket = new SockJS(url);
    this.stompClient = Stomp.over(socket, { protocols: ['v12.stomp'] });
    const headers: Stomp.ConnectionHeaders = {};
    this.stompClient.connect(headers, () => {
      this.connectionSubject.next();
      this.userConnectionSubject.next();
      
      // this.routerSubscription = this.router.events
      //   .pipe(filter((event: Event) => event instanceof NavigationEnd))
      //   .subscribe(() => this.sendActivity());
    });
  }

  disconnect(): void {
    this.unsubscribe();

    this.connectionSubject = new ReplaySubject(1);
    this.userConnectionSubject = new ReplaySubject(1);

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
      this.routerSubscription = null;
    }

    if (this.stompClient) {
      if (this.stompClient.connected) {
        this.stompClient.disconnect();
      }
      this.stompClient = null;
    }
  }

  receive(): Subject<ReceivedNotification> {
    return this.listenerSubject;
  }

  userReceive(): Subject<ReceivedNotification> {
    return this.userListenerSubject;
  }

  subscribe(): void {
    if (this.connectionSubscription) {
      return;
    }

    this.connectionSubscription = this.connectionSubject.subscribe(() => {
      if (this.stompClient) {
        this.stompSubscription = this.stompClient.subscribe('/broadcast/all', (data: Stomp.Message) => {
          
          this.listenerSubject.next(JSON.parse(data.body));
        });
      }
    });
  }

  userSubscribe(): void {
    if (this.userConnectionSubscription) {
      return;
    }

    this.userConnectionSubscription = this.userConnectionSubject.subscribe(() => {
      if (this.stompClient) {
        this.userStompSubscription = this.stompClient.subscribe('/user/userqueue/all', (data: Stomp.Message) => {
          
          this.userListenerSubject.next(JSON.parse(data.body));
          let message : Message = JSON.parse(data.body);
          if(message?.unreadNotificationCount){
            this.predictionFacade.setUnreadNotificationCount(message.unreadNotificationCount);
          }
        });
      }
    });
  }

  unsubscribe(): void {
    if (this.stompSubscription) {
      this.stompSubscription.unsubscribe();
      this.stompSubscription = null;
    }

    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
      this.connectionSubscription = null;
    }
  }

  unsubscribeUser(): void {

    if (this.userStompSubscription) {
      this.userStompSubscription.unsubscribe();
      this.userStompSubscription = null;
    }

    if (this.userConnectionSubscription) {
      this.userConnectionSubscription.unsubscribe();
      this.userConnectionSubscription = null;
    }
  }

  private sendActivity(): void {
    if (this.stompClient?.connected) {
      this.stompClient.send(
        '/usercast', // destination
        JSON.stringify({ page: this.router.routerState.snapshot.url }), // body
        {} // header
      );
    }
  }
}
