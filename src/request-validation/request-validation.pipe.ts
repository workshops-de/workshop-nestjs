import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { BookProps } from '../books/book/book';

@Injectable()
export class RequestValidationPipe implements PipeTransform {
  transform(props?: Partial<BookProps>) {
    if (!Array.isArray(props?.authors)) {
      throw new BadRequestException('You must provide at least one `author`');
    }

    for (const author of props.authors) {
      if (author.trim().length === 0) {
        throw new BadRequestException("The author's name cannot be empty");
      }
    }

    return props;
  }
}
