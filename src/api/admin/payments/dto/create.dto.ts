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
  @Expose()
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  tariffId: number;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  invoiceId: number;

  @Expose()
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @Expose()
  @IsString()
  @IsOptional()
  subscribtionId?: string;
}
