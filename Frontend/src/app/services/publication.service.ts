import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Publication } from '../models/publication.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  private url: string;
  private user!: User;

  public publicationEmitter: EventEmitter<any>;
  public publicationSubs!: Subscription | undefined;

  private search: BehaviorSubject<string>;
  public currentSearchStatus: Observable<string>;

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}/publication`;

    this.publicationEmitter = new EventEmitter();

    this.search = new BehaviorSubject<string>('');
    this.currentSearchStatus = this.search.asObservable();
  }

  public reloadPublications(): void {
    this.publicationEmitter.emit();
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

  public async create(publication: Publication): Promise<any> {
    this.currentUser();
    publication.nickname = this.user.nickname;
    publication.userID = this.user.userID;

    const json = JSON.stringify(publication);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient.post(this.url, json, { headers }).toPromise();
  }

  public async get(): Promise<any> {
    this.currentUser();
    const params = new HttpParams().set('userID', this.user.userID);

    return await this._httpClient.get(this.url, { params }).toPromise();
  }

  public async getTags(publication: Publication): Promise<any> {
    this.currentUser();
    const params = new HttpParams().set(
      'publicationID',
      publication.publicationID
    );

    return await this._httpClient
      .get(`${this.url}/tags`, { params })
      .toPromise();
  }

  public async translate(content: string): Promise<any> {
    const json = JSON.stringify({ content });
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return await this._httpClient
      .post(`${this.url}/translate`, json, { headers })
      .toPromise();
  }

  public updateSearchStatus(data: string): void {
    this.search.next(data);
  }
}
