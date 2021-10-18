import { Component, Input, OnInit } from '@angular/core';

import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  @Input() placeholder: string;
  public data: string;

  constructor(private _publicationService: PublicationService) {
    this.placeholder = 'Search ...';
    this.data = '';
  }

  ngOnInit(): void {
    this._publicationService.updateSearchStatus('');
  }

  ngOnDestroy(): void {
    this._publicationService.updateSearchStatus('');
  }

  dataChange(value: string): void {
    this.data = value;
    this._publicationService.updateSearchStatus(this.data);
  }

  public isQuery() {
    return this.data !== '';
  }

  public resetQuery() {
    this.data = '';
    this._publicationService.updateSearchStatus(this.data);
  }
}
