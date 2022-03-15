import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    type: String,
    description: 'tariff name',
    example: 'Trial 2 weeks - 2.20$',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'tariff price',
    example: 2.2,
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    type: String,
    required: false,
    description: 'tariff subscribtion interval',
    examples: ['Day', 'Week', 'Month'],
  })
  @Expose()
  @IsString()
  @IsOptional()
  interval?: 'Day' | 'Week' | 'Month';

  @ApiProperty({
    type: String,
    required: false,
    description: 'tariff subscribtion period',
    examples: [10, 2, 1],
  })
  @Expose()
  @IsNumber()
  @IsOptional()
  period?: number;

  @ApiProperty({
    type: Boolean,
    required: false,
    default: false,
    description: 'tariff recurrent status',
    examples: [true, false],
  })
  @Expose()
  @IsBoolean()
  @IsOptional()
  recurrent?: boolean;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'tariff recurrent price',
    example: 10,
  })
  @Expose()
  @IsNumber()
  @IsOptional()
  recurrentPrice?: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'tariff subscribtion start hour (for example 3 hours = 3)',
    example: 3,
  })
  @Expose()
  @IsNumber()
  @IsOptional()
  startHour?: number;

  @ApiProperty({
    type: String,
    description: 'tariff describtion',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    default: false,
    description: 'tariff active status',
    examples: [true, false],
  })
  @Expose()
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
