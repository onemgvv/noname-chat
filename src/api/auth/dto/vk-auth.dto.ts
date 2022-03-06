import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class VKAuthDto {
  @Exclude()
  @IsString()
  @IsNotEmpty()
  token: string;

  @Exclude()
  @IsString()
  @IsNotEmpty()
  platform: 'mobile' | 'web';
}
