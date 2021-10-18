import { Item } from './item.model';

export class User {
  public userID!: number;
  public nickname: string;
  public password?: string;
  public confirmPassword?: string;
  public email: string;
  public name: string;
  public picture!: string;
  public bot: number;
  public faceID: boolean;
  public item: Item | undefined;

  constructor() {
    this.nickname = '';
    this.email = '';
    this.name = '';
    this.bot = 0;
    this.faceID = false;
    this.item = new Item();
  }
}
