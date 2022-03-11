import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateStoriesDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  preview: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsBoolean()
  @IsOptional()
  active: boolean;
}
