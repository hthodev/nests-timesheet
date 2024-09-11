import { MiddlewareConsumer, Module, OnModuleInit, RequestMethod } from '@nestjs/common';
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
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authConfig],
    }),
    DatabaseModule,
    UserModule,
    BranchModule,
    WorkingTimeModule,
    AuthModule,
  ],
  controllers: [AppController, UserController, SessionController, AuthController, AuthController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}