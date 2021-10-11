import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import { Camera, Home, ThumbsUp, User, Video } from 'angular-feather/icons';

import { LeftLinksComponent } from './left-links/left-links.component';
import { PostComponent } from './post/post.component';
import { PostStateFormComponent } from './post-state-form/post-state-form.component';

const icons = {
  Camera,
  Home,
  ThumbsUp,
  User,
  Video,
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
    FeatherModule.pick(icons),
  ]
})
export class ComponentsModule { }
