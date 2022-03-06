import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateTopicDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  adult: boolean;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  pinned: boolean;
}
