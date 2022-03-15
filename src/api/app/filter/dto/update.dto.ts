import { UserSex } from '@common/types/user.types';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

@Exclude()
export default class UpdateFilterDto {
  @ApiProperty({
    type: String,
    description: 'Users sex',
    required: false,
    examples: ['male', 'female', 'default'],
  })
  @Expose()
  @IsIn(['male', 'female', 'default'])
  @IsOptional()
  sex?: UserSex;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'filter max Age',
    maximum: 99,
    minimum: 16,
    example: 86,
  })
  @Expose()
  @IsNumber({}, { message: 'Минимальный возраст должен быть числом' })
  @IsOptional()
  @Min(16)
  @Max(99)
  ageMin?: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'filter max Age',
    maximum: 99,
    minimum: 16,
    example: 86,
  })
  @Expose()
  @IsNumber({}, { message: 'Максимальный возраст должен быть числом' })
  @IsOptional()
  @Min(16)
  @Max(99)
  ageMax?: number;

  @ApiProperty({
    type: String,
    required: false,
    description: 'filters city',
    example: 'Moscow',
  })
  @Expose()
  @IsString({ message: 'Поле должно быть строковым значением' })
  @IsOptional()
  city?: string;
}
