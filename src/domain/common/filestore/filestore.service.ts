import { IFilestoreService } from '@domain/common/filestore/interface/filestore.interface';
import * as fs from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { StorageService } from '@codebrew/nestjs-storage';
import { Folder } from '@common/types/app.types';

@Injectable()
export class FilestoreServiceImpl implements IFilestoreService {
  constructor(private storageService: StorageService) {}

  async uploadData(
    path: string,
    file: Express.Multer.File,
  ): Promise<{ path: string }> {
    const extension = file.originalname.split('.');
    const { folder, filePath } = this.setFolderName(
      path,
      extension[extension.length - 1],
    );

    await this.storageService
      .getDisk('local')
      .put(path + '/' + filePath, file.buffer);
    return { path: folder[folder.length - 1] + '/' + filePath };
  }

  async uploadDataFromSocket(
    path: string,
    base64: string,
    ext: string,
  ): Promise<{ path: string }> {
    const { folder, filePath } = this.setFolderName(path, ext);

    const buffer: Buffer = Buffer.from(base64, 'base64');
    await this.storageService
      .getDisk('local')
      .put(path + '/' + filePath, buffer);
    return { path: folder[folder.length - 1] + '/' + filePath };
  }

  async receiveImages(folder: Folder): Promise<string[]> {
    const folderItems: string[] = fs.readdirSync(
      '/var/noname.fun/storage/' + folder,
    );
    if (folderItems.length === 0)
      throw new NotFoundException('Folder ' + folder + ' is empty');
    return folderItems.map((item) => folder + '/' + item);
  }

  private setFolderName(path: string, ext: string) {
    const date: number = Date.now();
    const folder = path.split('/');
    const filePath = `${folder[folder.length - 1]}-${date}.${ext}`;
    return { folder, filePath };
  }
}
