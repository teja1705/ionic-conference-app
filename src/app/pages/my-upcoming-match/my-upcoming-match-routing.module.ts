import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyUpcomingMatchPage } from './my-upcoming-match.page';

const routes: Routes = [
  {
    path: '',
    component: MyUpcomingMatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyUpcomingMatchPageRoutingModule {}
