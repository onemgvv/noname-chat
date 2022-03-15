import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

@Exclude()
export class GivePremiumDto {
  @ApiProperty({
    type: Number,
    description: 'The number of days for which the premium is issued',
  })
  @Expose()
  @IsNotEmpty({
    message:
      'Введите количество дней, на которое выдается премиум, в поле expiresIn',
  })
  @IsNumber({}, { message: 'expiresIn принимает только числа' })
  @Min(1, { message: 'Минимальное количество дней 1' })
  @Max(365, { message: 'Максимальное количество дней 365' })
  expiresIn: number;
}
