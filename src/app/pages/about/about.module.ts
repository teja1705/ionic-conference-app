import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AboutPage } from './about';
import { AboutPageRoutingModule } from './about-routing.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule,
    SuperTabsModule
  ],
  declarations: [AboutPage],
  bootstrap: [AboutPage],
})
export class AboutModule {}
