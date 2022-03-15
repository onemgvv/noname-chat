import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class VKAuthDto {
  @ApiProperty({
    type: String,
    description: 'Vk auth token',
  })
  @Exclude()
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({
    type: String,
    description: 'Authorization platform',
    examples: ['mobile', 'web'],
  })
  @Exclude()
  @IsString()
  @IsNotEmpty()
  platform: 'mobile' | 'web';
}
