import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class UpdateCityDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'name of the city',
    example: 'Saint-Petersburg',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  name?: string;
}
