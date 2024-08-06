import { MiddlewareConsumer, Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import authConfig from '../configs/auth.config';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { DatabaseModule } from 'databases/database.module';
import { UserModule } from './models/users/user.module';
import { UserController } from './models/users/user.controller';
import { UserService } from './models/users/user.service';
import { BranchModule } from './models/branches/branch.module';
import { WorkingTimeModule } from './models/workingTimes/workingTime.module';
import { SessionController } from './auth/session.controller';
import { NestApplication, RouterModule } from '@nestjs/core';
import { ExcludePrefixMiddleware } from './middlewares';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
    }),
    DatabaseModule,
    UserModule,
    BranchModule,
    WorkingTimeModule,
  ],
  controllers: [AppController, UserController, SessionController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule {
}