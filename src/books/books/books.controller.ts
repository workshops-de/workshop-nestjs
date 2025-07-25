import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes
} from '@nestjs/common';
import { RequestValidationPipe } from '../../request-validation/request-validation.pipe';
import { Book } from '../book/book';
import { CreateBookDto, CreateBookDtoSchema } from '../dtos/create-book.dto/create-book.dto';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAll(): Promise<Book[]> {
    return this.booksService.getAll();
  }

  @Post()
  @UsePipes(new RequestValidationPipe(CreateBookDtoSchema))
  async create(@Body() dto: CreateBookDto): Promise<Pick<Book, 'id'>> {
    const createdBook = await this.booksService.create(dto);

    return { id: createdBook.id };
  }

  @Put(':id/order')
  async order(@Param('id') id: string, @Body() dto: { amountOrdered: number }): Promise<void> {
    const book = await this.booksService.getById(id);

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    this.booksService.order(book, dto);
  }

  @Put(':id/rate')
  async rate(@Param('id') id: string, @Body() dto: { newRating: number }): Promise<void> {
    const book = await this.booksService.getById(id);

    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    this.booksService.rate(book, dto);
  }
}
