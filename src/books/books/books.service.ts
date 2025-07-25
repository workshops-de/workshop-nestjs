import { Injectable } from '@nestjs/common';
import { Book } from '../book/book';
import { randomUUID } from 'crypto';
import { DomainException } from '../domain.exception';
import { CreateBookDto } from '../dtos/create-book.dto/create-book.dto';
import { EnvVariablesService } from '../../configuration/env-variables.service';

@Injectable()
export class BooksService {
  private bookCollection: Book[] = [
    new Book({
      id: randomUUID(),
      isbn: '978-0061976209',
      title: 'The Whale',
      authors: ['Samuel D. Hunter'],
      price: 16.99,
      rating: 5,
      amount: 1000
    })
  ];

  constructor(private envVariables: EnvVariablesService) {
    console.log(this.envVariables.get('database_name'));
    console.log(this.envVariables.get('database_server'));
  }

  getAll(): Promise<Book[]> {
    return Promise.resolve(this.bookCollection);
  }

  getById(id: string): Promise<Book | null> {
    const candidate = this.bookCollection.find(book => book.id === id) ?? null;

    return Promise.resolve(candidate);
  }

  async create(dto: CreateBookDto): Promise<Book> {
    const book = new Book({ id: randomUUID(), ...dto, rating: 0, amount: dto.amount ?? 0 });

    this.bookCollection.push(book);

    return Promise.resolve(book);
  }

  order(bookToOrder: Book, dto: { amountOrdered: number }) {
    const bookIndex = this.bookCollection.findIndex(book => book.id === bookToOrder.id);
    const book = this.bookCollection[bookIndex];

    if (book.amount < dto.amountOrdered) {
      throw new DomainException(
        `Order cancelled: ${dto.amountOrdered} copies of "${book.title}" have been ordered, but only ${book.amount} are available. More will be available, soon!`
      );
    }

    book.amount -= dto.amountOrdered;

    this.bookCollection[bookIndex] = book;
  }

  rate(bookToRate: Book, dto: { newRating: number }) {
    const bookIndex = this.bookCollection.findIndex(book => book.id === bookToRate.id);
    const book = this.bookCollection[bookIndex];

    if (dto.newRating < 1 || dto.newRating > 5) {
      throw new DomainException(
        `Rating discarded: The given rating ${dto.newRating} does not fit in the range 1-5.`
      );
    }

    book.rating = dto.newRating;

    this.bookCollection[bookIndex] = book;
  }
}
