import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class CreateTokenDto {
  @ApiProperty({
    type: Number,
    description: 'user id',
    example: 3,
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: String,
    description: 'refresh token',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
