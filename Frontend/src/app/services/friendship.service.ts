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

  public async create(friendID: number): Promise<any> {
    this.currentUser();
    const json = JSON.stringify({ userID: this.user.userID, friendID });
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(this.url, json, { headers }).toPromise();
  }

  public async getUserSuggestions(): Promise<any> {
    this.currentUser();
    const params = new HttpParams().set('userID', this.user.userID);

    return await this._httpClient.get(this.url, { params }).toPromise();
  }

  public async getRequests(): Promise<any> {
    this.currentUser();
    const params = new HttpParams().set('userID', this.user.userID);

    return await this._httpClient
      .get(`${this.url}/requests`, { params })
      .toPromise();
  }

  public async toAccept(friendshipID: number): Promise<any> {
    this.currentUser();
    const json = JSON.stringify({ userID: this.user.userID, friendshipID });
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient
      .post(`${this.url}/requests`, json, { headers })
      .toPromise();
  }

  public async reject(friendshipID: number): Promise<any> {
    const body = JSON.stringify({ friendshipID });
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient
      .delete(`${this.url}/requests`, { body, headers })
      .toPromise();
  }
}
