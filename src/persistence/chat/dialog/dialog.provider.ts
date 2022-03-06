import { DialogRepository } from './dialog.repository';
import { Provider } from '@nestjs/common';

export const DialogRepoProvider: Provider = {
  provide: 'DialogRepo',
  useClass: DialogRepository,
};
