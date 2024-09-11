// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth.service';
import { AuthController } from './auth.controller';
import { User } from 'models/user.model';
import authConfig from 'configs/auth.config';

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    SequelizeModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    GoogleAuthService,
  ],
  controllers: [AuthController],
  exports: [AuthService, GoogleAuthService],
})
export class AuthModule {}