import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContestListPage } from './contest-list.page';

const routes: Routes = [
  {
    path: '',
    component: ContestListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContestListPageRoutingModule {}
