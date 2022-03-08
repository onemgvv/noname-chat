import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateMessageDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber({}, { message: 'authorId числовое значение' })
  authorId: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber({}, { message: 'targetId числовое значение' })
  targetId: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber({}, { message: 'dialogId числовое значение' })
  dialogId: number;

  @Expose()
  @IsOptional()
  @IsString({ message: 'text строковое значение' })
  text: string;

  @Expose()
  @IsString()
  @IsOptional()
  voice?: string;

  @Expose()
  @IsString()
  @IsOptional()
  image?: string;
}
