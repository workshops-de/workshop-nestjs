import { Module } from '@nestjs/common';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';

@Module({
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
