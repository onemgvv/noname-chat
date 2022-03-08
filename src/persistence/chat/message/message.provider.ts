import { MESSAGE_REPO } from '@config/constants';
import { MessageRepository } from './message.repository';
import { Provider } from '@nestjs/common';

export const MessageRepoProvider: Provider = {
  provide: MESSAGE_REPO,
  useClass: MessageRepository,
};
