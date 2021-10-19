import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FeatherModule } from 'angular-feather';
import {
  Globe,
  Home,
  Paperclip,
  Search,
  Send,
  User,
  Users,
  X,
} from 'angular-feather/icons';

import { LeftLinksComponent } from './left-links/left-links.component';
import { LoaderComponent } from './loader/loader.component';
import { PostComponent } from './post/post.component';
import { PostStateFormComponent } from './post-state-form/post-state-form.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SwitchInputComponent } from './switch-input/switch-input.component';

const icons = {
  Globe,
  Home,
  Paperclip,
  Search,
  Send,
  User,
  Users,
  X,
};

@NgModule({
  declarations: [
    LeftLinksComponent,
    LoaderComponent,
    PostComponent,
    PostStateFormComponent,
    SearchBarComponent,
    SwitchInputComponent,
  ],
  exports: [
    LeftLinksComponent,
    LoaderComponent,
    PostComponent,
    PostStateFormComponent,
    SearchBarComponent,
    SwitchInputComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    FeatherModule.pick(icons),
  ],
})
export class ComponentsModule {}
