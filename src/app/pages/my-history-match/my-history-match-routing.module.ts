import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyHistoryMatchPage } from './my-history-match.page';

const routes: Routes = [
  {
    path: '',
    component: MyHistoryMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyHistoryMatchPageRoutingModule {}
