import { Provider } from '@nestjs/common';
import { MESSAGE_SERVICE } from '@config/constants';
import { MessageServiceImpl } from './message.service';

export const MessageServiceProvider: Provider = {
  provide: MESSAGE_SERVICE,
  useClass: MessageServiceImpl,
};
