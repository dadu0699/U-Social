import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { ChatComponent } from './chat/chat.component';
import { FeedComponent } from './feed/feed.component';
import { FriendSuggestionsComponent } from './friend-suggestions/friend-suggestions.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'chat', component: ChatComponent },
      { path: 'feed', component: FeedComponent },
      { path: 'friend-requests', component: FriendRequestsComponent },
      { path: 'friend-suggestions', component: FriendSuggestionsComponent },
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
