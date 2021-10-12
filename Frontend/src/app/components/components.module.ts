import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FeatherModule } from 'angular-feather';
import { Home, Paperclip, Send, User, Users } from 'angular-feather/icons';

import { LeftLinksComponent } from './left-links/left-links.component';
import { PostComponent } from './post/post.component';
import { PostStateFormComponent } from './post-state-form/post-state-form.component';

const icons = {
  Home,
  Paperclip,
  Send,
  User,
  Users,
};

@NgModule({
  declarations: [
    LeftLinksComponent,
    PostComponent,
    PostStateFormComponent,
  ],
  exports: [
    LeftLinksComponent,
    PostComponent,
    PostStateFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    FeatherModule.pick(icons),
  ]
})
export class ComponentsModule { }
