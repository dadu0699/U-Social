import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FeatherModule } from 'angular-feather';
import { Send } from 'angular-feather/icons';

import { PagesRoutingModule } from './pages-routing.module';

import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { ChatComponent } from './chat/chat.component';
import { FeedComponent } from './feed/feed.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { FriendSuggestionsComponent } from './friend-suggestions/friend-suggestions.component';
import { ProfileComponent } from './profile/profile.component';

const icons = {
  Send,
};

@NgModule({
  declarations: [
    PagesComponent,
    ChatComponent,
    FeedComponent,
    FriendRequestsComponent,
    FriendSuggestionsComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    PagesRoutingModule,
    Ng2SearchPipeModule,
    FeatherModule.pick(icons),
    ComponentsModule,
    SharedModule,
  ],
})
export class PagesModule {}
