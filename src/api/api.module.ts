import { Module } from '@nestjs/common';
import { AuthController } from '@api/auth/auth.controller';

@Module({
  controllers: [AuthController]
})
export class ApiModule { }
