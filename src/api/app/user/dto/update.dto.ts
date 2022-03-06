import { UserSex } from '@common/types/user.types';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsIn } from 'class-validator';

@Exclude()
export class UpdateUserDto {
  @Expose()
  @IsOptional()
  @IsString()
  name?: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  age?: number;

  @Expose()
  @IsOptional()
  @IsIn(['male', 'female', 'default'])
  sex?: UserSex;

  @Expose()
  @IsOptional()
  @IsString()
  email?: string;

  @Expose()
  @IsOptional()
  @IsString()
  city?: string;

  @Expose()
  @IsOptional()
  @IsString()
  photo?: string;
}
