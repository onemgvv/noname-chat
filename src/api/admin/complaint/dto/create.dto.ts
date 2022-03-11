import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class CreateComplaintsDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  targetId: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  type: string;
}
