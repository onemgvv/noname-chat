import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class AppleSignDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  familyName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  givenName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  user: string;
}
