import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CovidTrackerComponent} from './modules/covid-tracker/covid-tracker.component';

const routes: Routes = [
  { path: '', redirectTo: '/covid', pathMatch: 'full' },
  { path: 'covid', component: CovidTrackerComponent, data:{page: "covid"}},
  { path: '**', redirectTo: '/covid' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [ RouterModule ]
})
export class AppRouterModule { }
