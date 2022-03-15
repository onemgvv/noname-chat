import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDate,
  IsOptional,
} from 'class-validator';

@Exclude()
export class CreatePaymentDto {
  @ApiProperty({
    type: String,
    description: 'account id',
    example: 'bratoz1984@gmail.com',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @ApiProperty({
    type: Number,
    description: 'tariff id',
    example: 19,
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  tariffId: number;

  @ApiProperty({
    type: Number,
    description: 'invoice id',
    example: 876,
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  invoiceId: number;

  @ApiProperty({
    type: Date,
    description: 'Subscribtion start date in hours',
    example: 6,
  })
  @Expose()
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Subscribtion ID',
  })
  @Expose()
  @IsString()
  @IsOptional()
  subscribtionId?: string;
}
