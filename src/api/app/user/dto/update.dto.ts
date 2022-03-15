import { UserSex } from '@common/types/user.types';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

@Exclude()
export class UpdateUserDto {
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
    required: false,
    minLength: 2,
    maxLength: 2,
  })
  @Expose()
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Users sex',
    examples: ['male', 'female', 'default'],
  })
  @Expose()
  @IsOptional()
  @IsIn(['male', 'female', 'default'])
  sex?: UserSex;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Users email',
    example: 'bratoz1984@gmail.com',
  })
  @Expose()
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Users password',
    example: 'mvmnt2221',
    maxLength: 255,
    minLength: 8,
  })
  @Expose()
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Users avatar memoji',
    examples: [
      'premium_memojies/memojie11.png',
      'default_memojies/memoji01.png',
    ],
    maxLength: 255,
    minLength: 8,
  })
  @Expose()
  @IsOptional()
  @IsString()
  photo?: string;
}
