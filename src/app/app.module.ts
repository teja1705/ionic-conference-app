import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
    EffectsModule.forRoot(effects)
  ],
  declarations: [AppComponent],
  providers: [InAppBrowser, AppConstants],
  bootstrap: [AppComponent]
})
export class AppModule {}
