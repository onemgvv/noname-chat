import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Exclude()
export class CreateBlacklistDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  readonly ownerId: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}
