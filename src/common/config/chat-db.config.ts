import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export class PostgresConfig {
  static getOrmConfig(configService: ConfigService): PostgresConnectionOptions {
    return {
      type: 'postgres',
      database: configService.get('CHAT_DB_NAME'),
      host: configService.get('CHAT_DB_HOST'),
      port: Number(configService.get('CHAT_DB_PORT')),
      username: configService.get('CHAT_DB_USERNAME'),
      password: configService.get('CHAT_DB_PASSWORD'),
      entities: [process.cwd() + '/dist/persistence/chat/**/*.entity{.js,.ts}'],
      migrationsTableName: 'migrations',
      migrations: [process.cwd() + '/src/database/migrations/chat/*{.js,.ts}'],
      cli: {
        migrationsDir: process.cwd() + '/src/database/migrations/chat',
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
