import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

@Exclude()
export class CreateDialogDto {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  targetId: number;

  @Expose()
  @IsNumber()
  @IsOptional()
  lastMessage?: number;
}
