import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

@Exclude()
export class CreateBotMessageDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  botId: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  text: string;

  @Expose()
  @IsString()
  @IsOptional()
  photo?: string;
}
