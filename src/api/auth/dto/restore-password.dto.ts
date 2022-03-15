import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class RestorePasswordDto {
  @ApiProperty({
    type: String,
    description: 'Refresh password code',
    example: 865433,
    minimum: 100000,
    maximum: 999999,
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  code: number;

  @ApiProperty({
    type: String,
    description: 'Users password',
    minLength: 8,
    maxLength: 255,
    example: 'mnb67632',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    description: 'Users password repeate',
    minLength: 8,
    maxLength: 255,
    example: 'mnb67632',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  rPassword: string;
}
