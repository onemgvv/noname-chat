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
      database: configService.get('ADMIN_DB_NAME'),
      host: configService.get('ADMIN_DB_HOST'),
      port: Number(configService.get('ADMIN_DB_PORT')),
      username: configService.get('ADMIN_DB_USERNAME'),
      password: configService.get('ADMIN_DB_PASSWORD'),
      entities: [
        process.cwd() + '/dist/persistence/admin/**/*.entity{.js,.ts}',
      ],
      migrationsTableName: 'migrations',
      migrations: [process.cwd() + '/src/database/migrations/admin/*{.js,.ts}'],
      cli: {
        migrationsDir: process.cwd() + '/src/database/migrations/admin',
      },
    };
  }
}

export const adminDbConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> =>
    PostgresConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
