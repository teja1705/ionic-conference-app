import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContestViewPage } from './contest-view.page';

const routes: Routes = [
  {
    path: '',
    component: ContestViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContestViewPageRoutingModule {}
