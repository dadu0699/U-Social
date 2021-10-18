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
  public photoForm: boolean;
  public errorMessage: {
    nickname?: string;
    password?: string;
    photo?: string;
  };

  public loading: boolean;
  public user: User;
  public userRegister: User;

  public photo!: File;
  public photoSelected!: string | ArrayBuffer | null;
  public imagePreview: string;

  constructor(private _router: Router, private _userService: UserService) {
    if (this._userService.getUser() !== undefined) {
      this._router.navigate(['/']);
    }

    this.login = true;
    this.photoForm = false;
    this.errorMessage = {};

    this.loading = false;
    this.user = new User();
    this.userRegister = new User();
    this.imagePreview =
      'https://johannesippen.com/img/blog/humans-not-users/header.jpg';
  }

  ngOnInit() {}

  public alternateLog() {
    this.login = !this.login;
    this.photoForm = false;
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

  public onPhotoSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.photo = <File>event.target.files[0];

      // Image Preview and base64
      const reader = new FileReader();
      reader.readAsDataURL(this.photo);
      reader.onload = () => {
        this.photoSelected = reader.result;

        if (typeof reader.result === 'string') {
          if (this.userRegister.item) {
            this.userRegister.item.base64 =
              reader.result.split('?')[0].split('base64,').pop() || '';
          }
        }
      };
    }
  }

  public async signup(): Promise<void> {
    if (!this.photoSelected || !this.userRegister.item) {
      // this.errorMessage.photo = 'You need a profile photo';
      this.errorMessage.photo = 'Your photo is being processed';
      return;
    }

    this.errorMessage = {};
    this.loading = true;

    try {
      const mimetype = this.photo.name.split('?')[0].split('.').pop();
      if (
        mimetype === undefined ||
        !this.userRegister.item.imageTypes().includes(mimetype)
      ) {
        this.errorMessage.photo = 'Unsupported file type';
        this.loading = false;
        return;
      }
      this.userRegister.item.mimetype = mimetype;

      const response = await this._userService.signUp(this.userRegister);
      if (response['code'] === 200) {
        this.alternateLog();
        this.user = new User();
        this.userRegister = new User();
      }
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
  }
}
