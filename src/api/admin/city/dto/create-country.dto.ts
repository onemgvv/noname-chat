import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCountryDto {
  @ApiProperty({
    type: String,
    description: 'name of the city',
    example: 'Saint-Petersburg',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
