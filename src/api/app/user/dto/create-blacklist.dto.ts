import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Exclude()
export class CreateBlacklistDto {
  @ApiProperty({
    type: String,
    description: 'Blacklist owner id',
    example: 3,
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  readonly ownerId: number;

  @ApiProperty({
    type: String,
    description: 'Blacklist user id',
    example: 5,
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
}
