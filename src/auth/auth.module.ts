// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule } from '@nestjs/config';
import authConfig from '../../configs/auth.config';
import { UserService } from 'src/models/users/user.service';
import { User } from 'models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from 'src/models/users/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    ConfigModule.forFeature(authConfig),
    SequelizeModule.forFeature([User]), // Ensure this is correct
    UserModule // Import UserModule if User is defined there
  ],
  providers: [
    GoogleStrategy,
    AuthService,
    UserService
  ],
  exports: [PassportModule, AuthService, UserService],
})
export class AuthModule {}