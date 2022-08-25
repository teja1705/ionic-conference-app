import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyLiveMatchPage } from './my-live-match.page';

const routes: Routes = [
  {
    path: '',
    component: MyLiveMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyLiveMatchPageRoutingModule {}
