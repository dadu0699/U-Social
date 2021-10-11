import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import { Home, LogOut, MessageCircle, Settings, User, UserPlus } from 'angular-feather/icons';

import { HeaderComponent } from './header/header.component';

const icons = {
  Home,
  LogOut,
  MessageCircle,
  Settings,
  User,
  UserPlus,
};

@NgModule({
  declarations: [
    HeaderComponent
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(icons),
  ]
})
export class SharedModule { }
