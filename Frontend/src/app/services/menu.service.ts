import { Injectable } from '@angular/core';

import { Menu } from '../utils/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  public getLeftLinks(): Menu[] {
    return [
      { title: 'Home', icon: 'home', route: '/social/feed' },
      { title: 'Profile', icon: 'user', route: '/social/profile' },
      { title: 'Message', icon: 'message-circle', route: '/social/chat' },
      { title: 'Friend Requests', icon: 'users', route: '/social/friend-requests' },
      { title: 'People You May Know', icon: 'user-plus', route: '/social/friend-suggestions' },
    ];
  }
}
