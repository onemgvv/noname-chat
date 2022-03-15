import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Exclude()
export class UpdateBotMessageDto {
  @ApiProperty({
    type: String,
    required: false,
    description: 'bot message text',
    example: 'Hello, honey 🥰',
  })
  @Expose()
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'bot message photo',
    example: 'bot_image/photo1231.png',
  })
  @Expose()
  @IsString()
  @IsOptional()
  photo?: string;
}
