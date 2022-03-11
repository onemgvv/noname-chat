import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdateBotMessageDto {
  @Expose()
  @IsString()
  @IsOptional()
  text?: string;

  @Expose()
  @IsString()
  @IsOptional()
  photo?: string;
}
