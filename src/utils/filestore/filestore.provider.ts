import { FilestoreServiceImpl } from './filestore.service';
import { Provider } from '@nestjs/common';
import { FILESTORE_SERVICE } from '@config/constants';

export const FilestoreServiceProvider: Provider = {
  provide: FILESTORE_SERVICE,
  useClass: FilestoreServiceImpl,
};
