import { Controller, Get } from '@nestjs/common';
import { Book } from '../book/book';
import { randomUUID } from 'crypto';

@Controller('books')
export class BooksController {
  private books: Book[] = [
    new Book({
      id: randomUUID(),
      isbn: '978-0061976209',
      title: 'The Whale',
      authors: ['Samuel D. Hunter'],
      price: 16.99,
      amount: 1000,
      rating: 5
    })
  ];

  @Get()
  getAll(): Promise<Book[]> {
    return Promise.resolve(this.books);
  }
}
