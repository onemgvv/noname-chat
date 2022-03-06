import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class CreateTokenDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
