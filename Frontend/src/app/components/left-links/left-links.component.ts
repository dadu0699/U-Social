import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { defaultPicture } from 'src/app/utils/shared-functions';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Menu } from 'src/app/utils/interfaces';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-left-links',
  templateUrl: './left-links.component.html',
  styleUrls: ['./left-links.component.css'],
})
export class LeftLinksComponent implements OnInit {
  public links: Menu[];
  public user: User;
  public imagePreview: string;

  constructor(
    private _router: Router,
    private _menuService: MenuService,
    private _userService: UserService
  ) {
    this.links = _menuService.getLeftLinks();
    this.user = new User();
    this.imagePreview = defaultPicture;
  }

  ngOnInit(): void {
    this.load();

    if (this._userService.profileSubs === undefined) {
      this._userService.profileSubs =
        this._userService.profileEmitter.subscribe(() => this.load());

      this._userService.profileSubs = undefined;
    }
  }

  private load(): void {
    this.getUser();
    this.imagePreview = `${environment.bucket}/${this.user.picture}`;
  }

  private getUser(): void {
    const user: User | undefined = this._userService.getUser();
    if (user !== undefined) this.user = user;
  }

  public logOut(): void {
    localStorage.clear();
    this._router.navigate(['/auth']);
  }
}
