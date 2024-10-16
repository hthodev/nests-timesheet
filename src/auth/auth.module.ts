// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './auth.service';
import { GoogleAuthService } from './google-auth.service';
import { AuthController } from './auth.controller';
import authConfig from 'configs/auth.config';
import { User } from 'src/models/users/user.model';

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