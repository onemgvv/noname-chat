import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateContentDto {
  @ApiProperty({
    type: String,
    description: 'Story contents background [image or color]',
    examples: ['#ccbbaa', 'background/image11.png'],
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  background: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Story contents first button',
    example: 'https://noname.fun/action1',
  })
  @Expose()
  @IsString()
  @IsOptional()
  first_button?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Story contents second button',
    example: 'https://noname.fun/action2',
  })
  @Expose()
  @IsString()
  @IsOptional()
  second_button?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Story contents first link',
    example: 'https://example.com/link1',
  })
  @Expose()
  @IsString()
  @IsOptional()
  first_link?: string;

  @ApiProperty({
    type: String,
    required: false,
    description: 'Story contents second link',
    example: 'https://example.com/link2',
  })
  @Expose()
  @IsString()
  @IsOptional()
  second_link?: string;
}
