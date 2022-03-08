import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Dialog } from '@persistence/chat/dialog/dialog.entity';
import { Message } from '@persistence/chat/message/message.entity';

export class PostgresConfig {
  static getOrmConfig(configService: ConfigService): PostgresConnectionOptions {
    return {
      type: 'postgres',
      database: configService.get('CHAT_DB_NAME'),
      host: configService.get('CHAT_DB_HOST'),
      port: Number(configService.get('CHAT_DB_PORT')),
      username: configService.get('CHAT_DB_USERNAME'),
      password: configService.get('CHAT_DB_PASSWORD'),
      entities: [Dialog, Message],
      synchronize: false,
      migrations: ['/src/database/migrations/*.js'],
      cli: {
        migrationsDir: 'src/database/migrations',
      },
    };
  }
}

export const chatDbConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> =>
    PostgresConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
