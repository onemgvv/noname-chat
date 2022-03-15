import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@Exclude()
export class CreateDialogDto {
  @ApiProperty({
    type: Number,
    description: 'Dialog author id',
    example: 123,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @ApiProperty({
    type: Number,
    description: 'Dialog target id',
    example: 13,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  targetId: number;

  @ApiProperty({
    type: Number,
    required: false,
    description: 'Dialog last message id',
    example: 3221,
  })
  @Expose()
  @IsNumber()
  @IsOptional()
  lastMessage?: number;
}
