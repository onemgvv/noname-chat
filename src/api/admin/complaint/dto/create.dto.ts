import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@Exclude()
export class CreateComplaintsDto {
  @ApiProperty({
    type: Number,
    description: 'complaint sender id',
    example: 19,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  senderId: number;

  @ApiProperty({
    type: Number,
    description: 'complaint target id',
    example: 23,
  })
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  targetId: number;

  @ApiProperty({
    type: String,
    description: 'type of complaint',
    example: 'Abuse',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  type: string;
}
