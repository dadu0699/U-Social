import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { FriendshipService } from 'src/app/services/friendship.service';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.css'],
})
export class FriendRequestsComponent implements OnInit {
  public requests: any[];
  public loading: boolean;

  constructor(private _friendShipService: FriendshipService) {
    this.requests = [];
    this.loading = false;
  }

  async ngOnInit(): Promise<void> {
    await this.getSuggestions();
  }

  public async getSuggestions(): Promise<void> {
    this.loading = true;
    try {
      const response = await this._friendShipService.getRequests();
      if (response['code'] === 200) {
        this.requests = response['data'];
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  public getPicture(suggestion: any): string {
    return `${environment.bucket}/${suggestion.picture}`;
  }

  public async addFriend(friendshipID: number): Promise<void> {
    try {
      const response = await this._friendShipService.toAccept(friendshipID);
      if (response['code'] === 200) {
        await this.getSuggestions();
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async reject(friendshipID: number): Promise<void> {
    try {
      const response = await this._friendShipService.reject(friendshipID);
      if (response['code'] === 200) {
        await this.getSuggestions();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
