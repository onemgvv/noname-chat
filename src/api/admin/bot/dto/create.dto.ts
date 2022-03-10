import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateBotDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsOptional()
  photo?: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
