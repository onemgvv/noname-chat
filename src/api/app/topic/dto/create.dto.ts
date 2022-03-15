import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CreateTopicDto {
  @ApiProperty({
    type: String,
    description: 'Topics name',
    example: 'I wonna talk with you',
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    type: Boolean,
    description: 'Topics adult status',
    examples: [true, false],
  })
  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  adult: boolean;

  @ApiProperty({
    type: Number,
    description: 'Topics users id',
    example: 9,
  })
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    type: Boolean,
    description: 'Topics pinned status',
    examples: [true, false],
  })
  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  pinned: boolean;
}
