import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UploadFileDto {
  @Expose()
  @ApiProperty({
    name: 'Uploaded file',
  })
  file: Express.Multer.File;
}
