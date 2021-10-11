import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FeatherModule } from 'angular-feather';
import { Send } from 'angular-feather/icons';

import { PagesRoutingModule } from './pages-routing.module';

import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { ChatComponent } from './chat/chat.component';
import { FeedComponent } from './feed/feed.component';

const icons = {
  Send,
};

@NgModule({
  declarations: [
    PagesComponent,
    ChatComponent,
    FeedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    PagesRoutingModule,
    FeatherModule.pick(icons),
    ComponentsModule,
    SharedModule
  ]
})
export class PagesModule { }
