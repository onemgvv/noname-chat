import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  IsNumber,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  IsBoolean,
} from 'class-validator';

@Exclude()
export class CreateEliteDto {
  @ApiProperty({
    type: String,
    description: 'Elite description',
  })
  @Expose()
  @IsNotEmpty({ message: 'Описание обязательное поле!' })
  @IsString({ message: 'Описание должно быть текстовым значением!' })
  description: string;

  @ApiProperty({
    type: Boolean,
    description: 'Elites adult status',
    examples: [true, false],
  })
  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  adult: boolean;

  @ApiProperty({
    type: Number,
    description: 'Elite expires date',
    example: 5,
  })
  @Expose()
  @Min(1)
  @Max(30)
  @IsNotEmpty({ message: 'expiresIn обязательное поле!' })
  @IsNumber({}, { message: 'expiresIn должно быть числовым значением!' })
  expiresIn: number;
}
