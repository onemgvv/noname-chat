import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCountryDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'name of the country',
    example: 'Saint-Petersburg',
  })
  @IsString()
  @IsNotEmpty()
  name?: string;
}
