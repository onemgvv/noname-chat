import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';

@Exclude()
export class FastRegisterDto {
  @ApiProperty({
    type: String,
    description: 'Email address',
    example: 'ivanov@mail.ru',
  })
  @Expose()
  @IsEmail({}, { message: 'Некорректный E-mail адресс' })
  @IsNotEmpty({ message: 'Введите E-mail' })
  email: string;
}
