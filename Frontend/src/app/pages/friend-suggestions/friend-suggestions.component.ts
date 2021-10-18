import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { FriendshipService } from 'src/app/services/friendship.service';

@Component({
  selector: 'app-friend-suggestions',
  templateUrl: './friend-suggestions.component.html',
  styleUrls: ['./friend-suggestions.component.css'],
})
export class FriendSuggestionsComponent implements OnInit {
  public suggestions: any[];
  public loading: boolean;

  constructor(private _friendShipService: FriendshipService) {
    this.suggestions = [];
    this.loading = false;
  }

  async ngOnInit(): Promise<void> {
    await this.getSuggestions();
  }

  public async getSuggestions(): Promise<void> {
    this.loading = true;
    try {
      const response = await this._friendShipService.getUserSuggestions();
      if (response['code'] === 200) {
        this.suggestions = response['data'];
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }

  public getPicture(suggestion: any): string {
    return `${environment.bucket}/${suggestion.picture}`;
  }

  public async addFriend(userID: number): Promise<void> {
    try {
      const response = await this._friendShipService.create(userID);
      if (response['code'] === 200) {
        await this.getSuggestions();
      }
    } catch (error) {
      console.log(error);
    }
  }
}
