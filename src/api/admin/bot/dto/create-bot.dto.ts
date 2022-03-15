import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateBotDto {
  @ApiProperty({
    type: String,
    description: 'Bots name',
    example: 'Caroline',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'bot message text',
    example: 'premium_memojies/caroline.png',
  })
  @Expose()
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    default: false,
    description: 'bot active status',
    examples: [true, false],
  })
  @Expose()
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
