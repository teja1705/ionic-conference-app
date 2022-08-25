import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BioProfilePage } from './bio-profile.page';

const routes: Routes = [
  {
    path: '',
    component: BioProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BioProfilePageRoutingModule {}
