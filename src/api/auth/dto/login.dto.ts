import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class LoginUserDto {
  @ApiProperty({
    type: String,
    description: 'Email address',
    example: 'ivanov@mail.ru',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Users password',
    minLength: 8,
    maxLength: 255,
    example: 'mnb67632',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;
}
