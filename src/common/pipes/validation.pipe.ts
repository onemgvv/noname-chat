import { plainToClass } from 'class-transformer';
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      const messages = errors.map((err) => {
        return `[${err.property.toUpperCase()}]: ${Object.values(
          err.constraints,
        ).join(', ')}`;
      });

      throw new UnprocessableEntityException(messages);
    }
    return value;
  }
}
