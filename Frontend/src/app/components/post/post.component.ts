import { Component, Input, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Publication } from 'src/app/models/publication.model';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styles: [
    `
      .tag {
        margin-right: 5px;
      }
    `,
    `
      p {
        margin-bottom: 0.5rem;
      }
    `,
    `
      .translation {
        cursor: pointer;
      }
    `,
  ],
})
export class PostComponent implements OnInit {
  @Input() publication: Publication;
  public translate: string;

  constructor(private _publicationService: PublicationService) {
    this.publication = new Publication();
    this.translate = '';
  }

  ngOnInit(): void {}

  public getPhoto(): string {
    return `${environment.bucket}/${this.publication.photo}`;
  }

  public getPicture(): string {
    return `${environment.bucket}/${this.publication.picture}`;
  }

  public async translateText(): Promise<void> {
    try {
      const response = await this._publicationService.translate(
        this.publication.content
      );
      if (response['code'] === 200) {
        const data = response['data'];
        this.publication.content = `${data[
          'SourceLanguageCode'
        ].toUpperCase()}: ${this.publication.content}`;
        this.translate = data['TranslatedText'];
      }
    } catch (error) {
      console.log(error);
    }
  }
}
