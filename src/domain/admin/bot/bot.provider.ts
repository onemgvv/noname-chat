import { BOT_SERVICE } from '@config/constants';
import { Provider } from '@nestjs/common';
import { BotServiceImpl } from './bot.service';

export const BotServiceProvider: Provider = {
  provide: BOT_SERVICE,
  useClass: BotServiceImpl,
};
