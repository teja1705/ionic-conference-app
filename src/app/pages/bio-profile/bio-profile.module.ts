import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BioProfilePageRoutingModule } from './bio-profile-routing.module';

import { BioProfilePage } from './bio-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BioProfilePageRoutingModule
  ],
  declarations: [BioProfilePage]
})
export class BioProfilePageModule {}
