import { Item } from './item.model';

export class Publication {
  public publicationID!: number;
  public content: string;
  public photo: string;
  public userID: number;
  public nickname: string;
  public picture!: string;
  public tags: string[];
  public item: Item;

  constructor() {
    this.content = '';
    this.photo = '';
    this.userID = 0;
    this.nickname = '';
    this.tags = [];
    this.item = new Item();
  }
}
