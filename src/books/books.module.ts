import { Module } from '@nestjs/common';
import { BooksController } from './books/books.controller';

@Module({
  controllers: [BooksController]
})
export class BooksModule {}
