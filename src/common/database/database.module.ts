import { adminDbConfigAsync } from './../config/admin-db.config';
import { chatDbConfigAsync } from '@config/chat-db.config';
import { mainDbConfigAsync } from '@config/main-db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {
  ADMIN_CONNECTION,
  CHAT_CONNECTION,
  DEFAULT_CONNECTION,
} from '@config/constants';

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

    TypeOrmModule.forRootAsync({
      name: ADMIN_CONNECTION,
      ...adminDbConfigAsync,
    }),
  ],
})
export class DatabaseModule {}
