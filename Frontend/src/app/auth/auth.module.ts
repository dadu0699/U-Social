import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FeatherModule } from 'angular-feather';
import { User, Eye, Mail } from 'angular-feather/icons';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const icons = {
  User,
  Eye,
  Mail
};

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    FeatherModule.pick(icons),
    AuthRoutingModule,
  ]
})
export class AuthModule { }
