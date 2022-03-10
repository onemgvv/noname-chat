import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdateBotDto {
  @Expose()
  @IsString()
  @IsOptional()
  name?: string;

  @Expose()
  @IsString()
  @IsOptional()
  photo?: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
