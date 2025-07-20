export type BookProps = {
  id: string;
  title: string;
  isbn: string;
  authors: string[];
  price: number;
  amount: number;
  rating: number;
  thumbnail?: string;
};

export class Book {
  public id: string;
  public title: string;
  public isbn: string;
  public authors: string[];
  public price: number;
  public amount: number;
  public rating: number;
  public thumbnail?: string;

  constructor(props: BookProps) {
    this.id = props.id;
    this.title = props.title;
    this.isbn = props.isbn;
    this.authors = props.authors;
    this.price = props.price;
    this.amount = props.amount;
    this.rating = props.rating;
    this.thumbnail = props.thumbnail;
  }
}
