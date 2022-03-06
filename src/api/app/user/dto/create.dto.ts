import { UserSex } from '@common/types/user.types';
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
  @Expose()
  @IsOptional()
  @IsString()
  name?: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @Expose()
  @IsNotEmpty()
  @IsIn(['male', 'female', 'default'])
  sex: UserSex;

  @Expose()
  @IsNotEmpty()
  @IsString()
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  password: string;
}
