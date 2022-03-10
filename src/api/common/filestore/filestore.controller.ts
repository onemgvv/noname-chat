import { Folder } from '@common/types/app.types';
import { FILESTORE_SERVICE } from '@config/constants';
import { IFilestoreService } from '@domain/common/filestore/interface/filestore.interface';
import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

const FilestoreService = () => Inject(FILESTORE_SERVICE);

@Controller()
export class FilestoreController {
  constructor(
    @FilestoreService() private filestoreService: IFilestoreService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filestoreService.uploadData('all_images', file);
  }

  @Post('bot_images')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBotImage(@UploadedFile() file: Express.Multer.File) {
    return this.filestoreService.uploadData('bot_images', file);
  }

  @Get('receive/:type')
  async receiveImages(@Param('type') type: Folder) {
    return this.filestoreService.receiveImages(type);
  }
}
