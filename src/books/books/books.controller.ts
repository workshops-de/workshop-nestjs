import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Book } from '../book/book';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAll(): Promise<Book[]> {
    return this.booksService.getAll();
  }

  @Put(':id/order')
  order(@Param('id') id: string, @Body() dto: { amountOrdered: number }): void {
    this.booksService.order(id, dto);
  }

  @Put(':id/rate')
  rate(@Param('id') id: string, @Body() dto: { newRating: number }): void {
    this.booksService.rate(id, dto);
  }
}
