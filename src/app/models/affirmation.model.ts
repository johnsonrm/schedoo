
export class Affirmation {
  public id: string = '';
  public title: string;
  public order: number = 0;
  public description: string;

  constructor(title: string, order: number, description: string, id?: string) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
  }
}

