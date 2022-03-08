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
  @Expose()
  @IsNotEmpty({ message: 'Описание обязательное поле!' })
  @IsString({ message: 'Описание должно быть текстовым значением!' })
  description: string;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  adult: boolean;

  @Expose()
  @Min(1)
  @Max(30)
  @IsNotEmpty({ message: 'expiresIn обязательное поле!' })
  @IsNumber({}, { message: 'expiresIn должно быть числовым значением!' })
  expiresIn: number;
}
