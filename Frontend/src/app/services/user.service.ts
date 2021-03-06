import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string;

  public profileEmitter: EventEmitter<any>;
  public profileSubs!: Subscription | undefined;

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}/user`;

    this.profileEmitter = new EventEmitter();
  }

  public reloadProfile(): void {
    this.profileEmitter.emit();
  }

  public getUser(): User | undefined {
    const user: string | null = localStorage.getItem('user');
    if (user !== null) return <User>JSON.parse(user);
    return undefined;
  }

  public async signIn(user: User): Promise<any> {
    const json = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient
      .post(`${this.url}/sign-in`, json, { headers })
      .toPromise();
  }

  public async signUp(user: User): Promise<any> {
    const json = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient
      .post(`${this.url}/sign-up`, json, { headers })
      .toPromise();
  }

  public async update(user: User): Promise<any> {
    const json = JSON.stringify(user);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient
      .post(`${this.url}/update`, json, { headers })
      .toPromise();
  }
}
