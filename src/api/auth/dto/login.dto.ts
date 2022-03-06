import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class LoginUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;
}
