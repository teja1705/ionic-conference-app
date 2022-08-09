import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePredictionPage } from './create-prediction.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePredictionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePredictionPageRoutingModule {}
