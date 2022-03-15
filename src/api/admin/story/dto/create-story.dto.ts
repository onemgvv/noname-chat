import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateStoriesDto {
  @ApiProperty({
    type: String,
    description: 'Story preview',
    example: 'story_preview/preview1.png',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  preview: string;

  @ApiProperty({
    type: String,
    description: 'Story title',
    example: 'SPING Global update',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: Boolean,
    description: 'Story active status',
    examples: [true, false],
  })
  @Expose()
  @IsBoolean()
  @IsOptional()
  active: boolean;
}
