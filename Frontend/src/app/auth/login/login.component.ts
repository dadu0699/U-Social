import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public login: boolean;
  public errorMessage: {
    nickname?: string;
    password?: string;
  };

  public loading: boolean;
  public user: User;

  constructor(private _router: Router, private _userService: UserService) {
    if (this._userService.getUser() !== undefined) {
      this._router.navigate(['/']);
    }

    this.login = true;
    this.errorMessage = {};

    this.loading = false;
    this.user = new User();
  }

  ngOnInit() {}

  public alternateLog() {
    this.login = !this.login;
  }

  public async signin(): Promise<void> {
    this.errorMessage = {};
    this.loading = true;

    try {
      const response = await this._userService.signIn(this.user);
      if (response['code'] === 200) {
        this.structureUser(response['data']);

        localStorage.setItem('user', JSON.stringify(this.user));
        this._router.navigate(['/social']);
      }
    } catch (error) {
      console.log(error);

      this.errorMessage.nickname = 'Incorrect username and/or password';
      this.errorMessage.password = ' ';
    }

    this.loading = false;
  }

  private structureUser(user: any): void {
    this.user.bot = user['custom:bot'];
    this.user.name = user.name;
    this.user.email = user.email;
    this.user.picture = user.picture;
    this.user.userID = user.userID;
    this.user.item = undefined;
  }
}
