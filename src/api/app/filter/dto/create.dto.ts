import { UserSex } from '@common/types/user.types';
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
  @Expose()
  @IsNotEmpty()
  @IsIn(['male', 'female', 'default'])
  sex: UserSex;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @Min(16)
  @Max(99)
  ageMin: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  @Min(16)
  @Max(99)
  ageMax: number;

  @Expose()
  @IsString()
  @IsOptional()
  city?: string;
}
