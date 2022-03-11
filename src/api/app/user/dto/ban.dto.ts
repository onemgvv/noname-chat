import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class BanUserDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  expiresIn: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  reason: string;
}
