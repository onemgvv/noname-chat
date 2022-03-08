import { UserSex } from '@common/types/user.types';
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
  @Expose()
  @IsIn(['male', 'female', 'default'])
  @IsOptional()
  sex?: UserSex;

  @Expose()
  @IsNumber({}, { message: 'Минимальный возраст должен быть числом' })
  @IsOptional()
  @Min(16)
  @Max(99)
  ageMin?: number;

  @Expose()
  @IsNumber({}, { message: 'Максимальный возраст должен быть числом' })
  @IsOptional()
  @Min(16)
  @Max(99)
  ageMax?: number;

  @Expose()
  @IsString({ message: 'Поле должно быть строковым значением' })
  @IsOptional()
  city?: string;
}
