import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdateTariffDto {
  @Expose()
  @IsOptional()
  @IsString()
  name?: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  price?: number;

  @Expose()
  @IsString()
  @IsOptional()
  interval?: 'Day' | 'Week' | 'Month';

  @Expose()
  @IsNumber()
  @IsOptional()
  period?: number;

  @Expose()
  @IsOptional()
  @IsString()
  description?: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  recurrent?: boolean;

  @Expose()
  @IsNumber()
  @IsOptional()
  recurrentPrice?: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  startHour?: number;

  @Expose()
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
