export class Item {
  public type: string;
  public mimetype: string;
  public base64: string | ArrayBuffer | null;

  constructor() {
    this.type = 'image';
    this.mimetype = 'png';
    this.base64 = '';
  }

  public imageTypes(): string[] {
    return ['jpg', 'jpeg', 'png'];
  }
}
