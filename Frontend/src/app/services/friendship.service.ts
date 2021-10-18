import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class FriendshipService {
  private url: string;
  private user!: User;

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}/friendship`;
  }

  public getUser(): User | undefined {
    const user: string | null = localStorage.getItem('user');
    if (user !== null) return <User>JSON.parse(user);
    return undefined;
  }

  private currentUser(): void {
    const user: User | undefined = this.getUser();
    if (user !== undefined) {
      this.user = user;
    }
  }

  public async create(userID: number, friendID: number): Promise<any> {
    const json = JSON.stringify({ userID, friendID });
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(this.url, json, { headers }).toPromise();
  }

  public async getUserSuggestions(): Promise<any> {
    this.currentUser();
    const params = new HttpParams().set('userID', this.user.userID);

    return await this._httpClient.get(this.url, { params }).toPromise();
  }

  public async toAccept(userID: number, friendshipID: number): Promise<any> {
    const json = JSON.stringify({ userID, friendshipID });
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient
      .post(`${this.url}/to-Accept`, json, { headers })
      .toPromise();
  }
}
