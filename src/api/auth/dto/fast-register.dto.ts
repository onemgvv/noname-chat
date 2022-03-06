import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';

@Exclude()
export class FastRegisterDto {
  @Expose()
  @IsEmail({}, { message: 'Некорректный E-mail адресс' })
  @IsNotEmpty({ message: 'Введите E-mail' })
  email: string;
}
