import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './database.config';
import { Sequelize } from 'sequelize-typescript';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        autoLoadModels: true,
        synchronize: true,
        dialectOptions: {
          ssl: {
            rejectUnauthorized: configService.get('database.ssl.rejectUnauthorized'),
            ca: configService.get('database.ssl.ca'),
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'SEQUELIZE',
      useExisting: Sequelize,
    },
  ],
  exports: ['SEQUELIZE'],
})
export class DatabaseModule {}
