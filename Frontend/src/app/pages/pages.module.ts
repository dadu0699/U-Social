import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { PagesRoutingModule } from './pages-routing.module';

import { PagesComponent } from './pages.component';
import { FeedComponent } from './feed/feed.component';


@NgModule({
  declarations: [
    PagesComponent,
    FeedComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    PagesRoutingModule,
  ]
})
export class PagesModule { }
