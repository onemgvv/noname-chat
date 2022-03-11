import { Exclude, Expose } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@Exclude()
export class CreateTariffDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Expose()
  @IsString()
  @IsOptional()
  interval?: 'Day' | 'Week' | 'Month';

  @Expose()
  @IsNumber()
  @IsOptional()
  period?: number;

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
  @IsNotEmpty()
  @IsString()
  description: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
