import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class RestorePasswordDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  rPassword: string;
}
