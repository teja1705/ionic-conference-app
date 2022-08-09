import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPredictionsPage } from './my-predictions.page';

const routes: Routes = [
  {
    path: '',
    component: MyPredictionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPredictionsPageRoutingModule {}
