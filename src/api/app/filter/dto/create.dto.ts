import { UserSex } from '@common/types/user.types';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

@Exclude()
export default class CreateFilterDto {
  @ApiProperty({
    type: String,
    description: 'users sex',
    examples: ['male', 'female', 'default'],
  })
  @Expose()
  @IsNotEmpty()
  @IsIn(['male', 'female', 'default'])
  sex: UserSex;

  @ApiProperty({
    type: Number,
    description: 'filter min Age',
    maximum: 99,
    minimum: 16,
    example: 26,
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @Min(16)
  @Max(99)
  ageMin: number;

  @ApiProperty({
    type: Number,
    description: 'filter max Age',
    maximum: 99,
    minimum: 16,
    example: 86,
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @Min(16)
  @Max(99)
  ageMax: number;

  @ApiProperty({
    type: String,
    required: false,
    description: 'filters city',
    example: 'Moscow',
  })
  @Expose()
  @IsString()
  @IsOptional()
  city?: string;
}
