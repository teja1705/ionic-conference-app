import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorial } from './providers/check-tutorial.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canLoad: [CheckTutorial]
  },
  {
    path: 'upcoming',
    loadChildren: () => import('./pages/upcoming/upcoming.module').then( m => m.UpcomingPageModule)
  },
  {
    path: 'live',
    loadChildren: () => import('./pages/live/live.module').then( m => m.LivePageModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./pages/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'contest',
    loadChildren: () => import('./pages/contest/contest.module').then( m => m.ContestPageModule)
  },
  {
    path: 'contest-list',
    loadChildren: () => import('./pages/contest-list/contest-list.module').then( m => m.ContestListPageModule)
  },
  {
    path: 'my-contests',
    loadChildren: () => import('./pages/my-contests/my-contests.module').then( m => m.MyContestsPageModule)
  },
  {
    path: 'my-predictions',
    loadChildren: () => import('./pages/my-predictions/my-predictions.module').then( m => m.MyPredictionsPageModule)
  },
  {
    path: 'create-prediction',
    loadChildren: () => import('./pages/create-prediction/create-prediction.module').then( m => m.CreatePredictionPageModule)
  },
  {
    path: 'contest-view',
    loadChildren: () => import('./pages/contest-view/contest-view.module').then( m => m.ContestViewPageModule)
  },
  {
    path: 'activate',
    loadChildren: () => import('./pages/activate/activate.module').then( m => m.ActivatePageModule)
  },
  {
    path: 'bio-profile',
    loadChildren: () => import('./pages/bio-profile/bio-profile.module').then( m => m.BioProfilePageModule)
  },
  {
    path: 'my-upcoming-match',
    loadChildren: () => import('./pages/my-upcoming-match/my-upcoming-match.module').then( m => m.MyUpcomingMatchPageModule)
  },
  {
    path: 'my-live-match',
    loadChildren: () => import('./pages/my-live-match/my-live-match.module').then( m => m.MyLiveMatchPageModule)
  },
  {
    path: 'my-history-match',
    loadChildren: () => import('./pages/my-history-match/my-history-match.module').then( m => m.MyHistoryMatchPageModule)
  },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
