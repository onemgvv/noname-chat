import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { mainDbConfigAsync } from '@config/main-db.config';
import { chatDbConfigAsync } from '@config/chat-db.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(mainDbConfigAsync),
    TypeOrmModule.forRootAsync(chatDbConfigAsync),

  ]
})
export class DatabaseModule { }
