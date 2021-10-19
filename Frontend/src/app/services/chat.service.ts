import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public url: string;
  private user!: User;

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}/chat`;
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

  public async getChats(): Promise<any> {
    this.currentUser();
    const params = new HttpParams().set('userID', this.user.userID);

    return await this._httpClient
      .get(`${this.url}/all`, { params })
      .toPromise();
  }

  public async sendMessage(message: any): Promise<any> {
    this.currentUser();
    message.userID = this.user.userID;
    const json = JSON.stringify(message);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(this.url, json, { headers }).toPromise();
  }

  public async getMessages(friendID: number): Promise<any> {
    this.currentUser();
    const params = new HttpParams()
      .set('userID', this.user.userID)
      .set('friendID', friendID);

    return await this._httpClient.get(this.url, { params }).toPromise();
  }
}
