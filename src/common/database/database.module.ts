import { chatDbConfigAsync } from '@config/chat-db.config';
import { mainDbConfigAsync } from '@config/main-db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CHAT_CONNECTION, DEFAULT_CONNECTION } from '@config/constants';
import { User } from '@persistence/app/user/user.entity';
import { Role } from '@persistence//app/role/role.entity';
import { Topic } from '@persistence//app/topic/topic.entity';
import { Token } from '@persistence//app/token/token.entity';
import { Elite } from '@persistence//app/elite/elite.entity';
import { Filter } from '@persistence//app/filter/filter.entity';
import { Dialog } from '@persistence//chat/dialog/dialog.entity';
import { Message } from '@persistence//chat/message/message.entity';
import { Blacklist } from '@persistence/app/blacklist/blacklist.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: DEFAULT_CONNECTION,
      ...mainDbConfigAsync,
    }),
    TypeOrmModule.forRootAsync({
      name: CHAT_CONNECTION,
      ...chatDbConfigAsync,
    }),
    TypeOrmModule.forFeature([
      User,
      Role,
      Topic,
      Token,
      Elite,
      Filter,
      Blacklist,
    ]),
    TypeOrmModule.forFeature([Dialog, Message], CHAT_CONNECTION),
  ],
})
export class DatabaseModule {}
