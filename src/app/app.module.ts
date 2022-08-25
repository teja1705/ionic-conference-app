import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { SuperTabsModule} from '@ionic-super-tabs/angular';
import { StoreModule } from '@ngrx/store'
import { predictionReducer } from './store/prediction.reducer';
import { EffectsModule } from '@ngrx/effects'
import { effects } from './store/prediction.effects';
import { PredictionService } from './store/prediction.service';
import { PredictionStoreFacade } from './store/prediction-store.facade';
import { AppConstants } from './providers/app-constants.service';
import { StoreDevtoolsModule  } from '@ngrx/store-devtools';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AppUtilService } from './providers/app.util.service';
import { TrackerService } from './providers/websocket/tracker.service';
import { YeaNotificationService } from './providers/websocket/notification.service';
import { WebSocketShareService } from './providers/websocket/WebSocketShareService';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {
  AuthorizationInterceptor,
  StandardHeaderInterceptor,
  ErrorInterceptor
} from './providers/interceptors';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertBottomSheetComponent } from './components/alert-bottom-sheet/alert-bottom-sheet.component';



@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    SuperTabsModule.forRoot(),
    StoreModule.forRoot({prediction : predictionReducer}),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      logOnly : environment.production
    }),
  ],
  declarations: [AppComponent, AlertBottomSheetComponent],
  providers: [InAppBrowser, AppConstants, LocalNotifications, AppUtilService, TrackerService, YeaNotificationService, WebSocketShareService, StatusBar,FingerprintAIO,
  ScreenOrientation, [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: StandardHeaderInterceptor,
    multi: true,
  }]],
  bootstrap: [AppComponent],
  exports : []
})
export class AppModule {
}
