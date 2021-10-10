import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNoFoundComponent } from './page-no-found/page-no-found.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'social',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  { path: '', redirectTo: 'social', pathMatch: 'full' },
  { path: '**', component: PageNoFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
