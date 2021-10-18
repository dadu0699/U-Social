import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FeatherModule } from 'angular-feather';
import { Loader } from 'angular-feather/icons';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';

const icons = { Loader };

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    AuthRoutingModule,
    FeatherModule.pick(icons),
  ],
})
export class AuthModule {}
