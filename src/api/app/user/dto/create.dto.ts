import { UserSex } from '@common/types/user.types';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsIn,
} from 'class-validator';

@Exclude()
export class CreateUserDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Users name',
    example: 'Alex',
  })
  @Expose()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: Number,
    description: 'Users age',
    example: 26,
    minimum: 16,
    maximum: 99,
    minLength: 2,
    maxLength: 2,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({
    type: String,
    description: 'Users sex',
    examples: ['male', 'female', 'default'],
  })
  @Expose()
  @IsNotEmpty()
  @IsIn(['male', 'female', 'default'])
  sex: UserSex;

  @ApiProperty({
    type: String,
    description: 'Users email',
    example: 'bratoz1984@gmail.com',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Users password',
    example: 'mvmnt2221',
    maxLength: 255,
    minLength: 8,
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;
}
