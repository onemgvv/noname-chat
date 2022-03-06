import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class AppleLoginDto {
  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  accessToken?: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  authorizationCode?: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  type?: 'web' | 'ios' | 'android';
}
