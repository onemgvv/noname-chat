import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { postgresConfigAsync } from 'common/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(postgresConfigAsync)]
})
export class DatabaseModule { }
