import { DialogRepository } from './dialog.repository';
import { Provider } from '@nestjs/common';
import { DIALOG_REPO } from '@config/constants';

export const DialogRepoProvider: Provider = {
  provide: DIALOG_REPO,
  useClass: DialogRepository,
};
