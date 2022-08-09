import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyContestsPage } from './my-contests.page';

const routes: Routes = [
  {
    path: '',
    component: MyContestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyContestsPageRoutingModule {}
