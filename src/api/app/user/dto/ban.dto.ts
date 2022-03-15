import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class BanUserDto {
  @ApiProperty({
    type: Number,
    description: 'Users id',
    example: 11,
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: Number,
    description: 'Ban expires in hours',
    example: 7,
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  expiresIn: number;

  @ApiProperty({
    type: String,
    description: 'Ban reason',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  reason: string;
}
