import { UploadFileDto } from './dto/file.dto';
import { Folder } from '@common/types/app.types';
import { FILESTORE_SERVICE } from '@config/constants';
import { IFilestoreService } from '@utils/filestore/interface/filestore.interface';
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
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

const FilestoreService = () => Inject(FILESTORE_SERVICE);

@ApiTags('Utils filestorage')
@Controller('filestore')
export class FilestoreController {
  constructor(
    @FilestoreService() private filestoreService: IFilestoreService,
  ) {}

  @ApiOperation({ summary: 'Upload file' })
  @ApiResponse({
    status: 200,
    description: 'File successfully uploaded',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadFileDto,
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filestoreService.uploadData('all_images', file);
  }

  @ApiOperation({ summary: 'Upload bots image' })
  @ApiResponse({
    status: 200,
    description: 'File successfully uploaded',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadFileDto,
  })
  @Post('bot_images')
  @UseInterceptors(FileInterceptor('file'))
  async uploadBotImage(@UploadedFile() file: Express.Multer.File) {
    return this.filestoreService.uploadData('bot_images', file);
  }

  @ApiOperation({ summary: 'receive images from storage' })
  @ApiResponse({ status: 200, description: 'Image received' })
  @ApiParam({ name: 'type' })
  @Get('receive/:type')
  async receiveImages(@Param('type') type: Folder) {
    return this.filestoreService.receiveImages(type);
  }
}
