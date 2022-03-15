import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

@Exclude()
export class CreateBotMessageDto {
  @ApiProperty({
    type: Number,
    description: 'Bot id',
    example: 3,
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  botId: number;

  @ApiProperty({
    type: String,
    description: 'bot message text',
    example: 'Hello, honey 🥰',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'bot message photo',
    example: 'bot_message/photo_1121.png',
  })
  @Expose()
  @IsString()
  @IsOptional()
  photo?: string;
}
