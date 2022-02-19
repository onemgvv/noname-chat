import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';

export class PostgresConfig {
  static getOrmConfig(configService: ConfigService): PostgresConnectionOptions {
    return {
      type: 'postgres',
      database: configService.get('DB_NAME'),
      host: configService.get('DB_HOST'),
      port: Number(configService.get('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      entities: ['dist/src/**/*.entity.js'],
      synchronize: true,
      migrations: ['dist/src/database/migrations/*.js'],
      cli: {
        migrationsDir: 'src/database/migrations'
      }
    }
  }
}

export const postgresConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> =>
    PostgresConfig.getOrmConfig(configService),
  inject: [ConfigService]
}