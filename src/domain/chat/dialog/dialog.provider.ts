import { DIALOG_SERVICE } from '@config/constants';
import { Provider } from '@nestjs/common';
import { DialogServiceImpl } from './dialog.service';

export const DialogServiceProvider: Provider = {
  provide: DIALOG_SERVICE,
  useClass: DialogServiceImpl,
};
