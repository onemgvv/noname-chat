import { MessageRepository } from './message.repository';
import { Provider } from '@nestjs/common';

export const MessageRepoProvider: Provider = {
  provide: 'MessageRepo',
  useClass: MessageRepository,
};
