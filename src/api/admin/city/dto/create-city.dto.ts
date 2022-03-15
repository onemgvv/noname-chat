import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class CreateCityDto {
  @ApiProperty({
    type: String,
    description: 'name of the city',
    example: 'Saint-Petersburg',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: Number,
    description: 'id of country',
    example: 8,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  countryId: number;
}
