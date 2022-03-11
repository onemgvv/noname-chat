import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateContentDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  background: string;

  @Expose()
  @IsString()
  @IsOptional()
  first_button?: string;

  @Expose()
  @IsString()
  @IsOptional()
  second_button?: string;

  @Expose()
  @IsString()
  @IsOptional()
  first_link?: string;

  @Expose()
  @IsString()
  @IsOptional()
  second_link?: string;
}
