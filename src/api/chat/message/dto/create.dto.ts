import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateMessageDto {
  @ApiProperty({
    type: Number,
    description: 'Message author id',
    example: 9,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber({}, { message: 'authorId числовое значение' })
  authorId: number;

  @ApiProperty({
    type: Number,
    description: 'Message target id',
    example: 11,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber({}, { message: 'targetId числовое значение' })
  targetId: number;

  @ApiProperty({
    type: Number,
    description: 'Message dialog id',
    example: 9,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber({}, { message: 'dialogId числовое значение' })
  dialogId: number;

  @ApiProperty({
    type: String,
    description: 'Message text',
    example: 'Greeting',
  })
  @Expose()
  @IsOptional()
  @IsString({ message: 'text строковое значение' })
  text: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Message voice (if exist)',
    example: 'voices/voice_61524.png',
  })
  @Expose()
  @IsString()
  @IsOptional()
  voice?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Message image (if exist)',
    example: 'images/image_61524.png',
  })
  @Expose()
  @IsString()
  @IsOptional()
  image?: string;
}
