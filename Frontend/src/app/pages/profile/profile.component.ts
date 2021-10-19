import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { defaultPicture } from 'src/app/utils/shared-functions';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public loading: boolean;
  public user: User;
  public bot: boolean;

  public photo!: File;
  public photoSelected!: string | ArrayBuffer | null;
  public imagePreview: string;

  constructor(private _userService: UserService) {
    this.loading = false;
    this.user = new User();
    this.bot = false;
    this.imagePreview = defaultPicture;
  }

  ngOnInit(): void {
    this.load();
  }

  private load(): void {
    this.getUser();
    this.user.item = new Item();
    this.bot = this.user.bot == 0 ? false : true;
    this.imagePreview = `${environment.bucket}/${this.user.picture}`;
  }

  private getUser(): void {
    const user: User | undefined = this._userService.getUser();
    if (user !== undefined) this.user = user;
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
          if (this.user.item) {
            this.user.item.base64 =
              reader.result.split('?')[0].split('base64,').pop() || '';
          }
        }
      };
    }
  }

  public async save(): Promise<void> {
    if (!this.photoSelected) {
      this.user.item = undefined;
    }

    this.loading = true;

    try {
      if (this.user.item !== undefined) {
        const mimetype = this.photo.name.split('?')[0].split('.').pop();
        if (
          mimetype === undefined ||
          !this.user.item.imageTypes().includes(mimetype)
        ) {
          this.loading = false;
          return;
        }
        this.user.item.mimetype = mimetype;
      }

      this.user.bot = this.bot ? 1 : 0;
      const response = await this._userService.update(this.user);

      if (response['code'] === 200) {
        this.user.password = '';
        this.user.picture = response['data'];
        localStorage.setItem('user', JSON.stringify(this.user));
        this.load();
        this._userService.reloadProfile();
      }
    } catch (error: any) {
      console.log(error);
    }

    this.loading = false;
  }
}
