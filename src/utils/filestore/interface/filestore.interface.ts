import { Folder } from '@common/types/app.types';

export interface IFilestoreService {
  uploadData(
    path: string,
    file: Express.Multer.File,
  ): Promise<{ path: string }>;

  uploadDataFromSocket(
    path: string,
    base64: string,
    ext: string,
  ): Promise<{ path: string }>;

  receiveImages(folder: Folder): Promise<string[]>;
}
