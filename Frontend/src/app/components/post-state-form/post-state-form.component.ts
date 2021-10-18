import { Component, OnInit } from '@angular/core';

import { delay } from 'src/app/utils/shared-functions';
import { Publication } from 'src/app/models/publication.model';
import { PublicationService } from 'src/app/services/publication.service';

@Component({
  selector: 'app-post-state-form',
  templateUrl: './post-state-form.component.html',
  styles: [
    `
      .button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        text-align: center;
        cursor: pointer;
      }
    `,
    `
      form {
        background-color: #1e2024;
      }
    `,
    `
      .error-message {
        padding-top: 0;
        text-align: center;
        width: 100%;
      }
    `,
    `
      .success-message {
        color: #00bc7e;
        display: block;
        text-align: center;
        width: 100%;
      }
    `,
  ],
})
export class PostStateFormComponent implements OnInit {
  public postCaption: string;
  public file!: File;

  public errorMessage: {
    file?: string;
    success?: string;
  };
  public saving: boolean;

  constructor(private _publicationService: PublicationService) {
    this.postCaption = '';

    this.errorMessage = {};
    this.saving = false;
  }

  ngOnInit(): void {}

  public onChange(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      this.errorMessage = {};

      if (this.file) {
        this.errorMessage.success = 'Image uploaded successfully';
      }
    }
  }

  public async uploadFile(): Promise<void> {
    if (!this.file) {
      this.errorMessage.file = 'It is necessary to post an image';
      return;
    }

    if (!this.saving) {
      this.saving = true;
      this.errorMessage = {};

      try {
        const publication: Publication = new Publication();
        publication.content = this.postCaption;

        const mimetype = this.file.name.split('?')[0].split('.').pop();
        if (
          mimetype === undefined ||
          (mimetype && !publication.imageTypes().includes(mimetype))
        ) {
          this.errorMessage.file = 'Unsupported file type';
          this.saving = false;
          return;
        }

        publication.item.mimetype = mimetype;
        this.getBase64(publication);
        await delay(750);

        await this._publicationService.create(publication);
        this.postCaption = '';
        this._publicationService.reloadPublications();
      } catch (error) {
        console.log(error);
      } finally {
        this.errorMessage = {};
        this.saving = false;
      }
    }
  }

  private async getBase64(publication: Publication): Promise<void> {
    const reader = new FileReader();

    if (this.file) {
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          publication.item.base64 =
            reader.result.split('?')[0].split('base64,').pop() || '';
        }
      };
    }
  }
}
