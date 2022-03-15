import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class AppleLoginDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'Apple access token',
  })
  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  accessToken?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Apple authorization code',
  })
  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  authorizationCode?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Apple device type',
    examples: ['web', 'ios', 'android'],
  })
  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  type?: 'web' | 'ios' | 'android';
}
