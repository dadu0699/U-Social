import { Component, OnInit } from '@angular/core';

import { Publication } from 'src/app/models/publication.model';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styles: [],
})
export class FeedComponent implements OnInit {
  public publications: Publication[];
  public search: string;
  public loading: boolean;

  constructor(private _publicationService: PublicationService) {
    this.publications = [];
    this.search = '';
    this.loading = false;
  }

  async ngOnInit(): Promise<void> {
    await this.getPublications();

    this._publicationService.currentSearchStatus.subscribe(
      (search) => (this.search = search)
    );

    if (this._publicationService.publicationSubs === undefined) {
      this._publicationService.publicationSubs =
        this._publicationService.publicationEmitter.subscribe(
          async () => await this.getPublications()
        );

      this._publicationService.publicationSubs = undefined;
    }
  }

  async getPublications(): Promise<void> {
    this.loading = true;
    try {
      const response = await this._publicationService.get();
      if (response['code'] === 200) {
        this.publications = response['data'];

        for (let i = 0; i < this.publications.length; i++) {
          const publication = this.publications[i];
          this.publications[i].tags = [];
          const tags = await this._publicationService.getTags(publication);

          tags['data'].forEach((tag: any) => {
            this.publications[i].tags = [
              ...this.publications[i].tags,
              tag['tag'],
            ];
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
    this.loading = false;
  }
}
