import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../../models/user.model';
import { UserService } from './user.service';
import { Sequelize } from 'sequelize-typescript';
import { WorkingTimeService } from '../workingTimes/workingTime.service';
import { WorkingTime } from 'models/workingTime.model';

@Module({
  imports: [SequelizeModule.forFeature([User]), SequelizeModule.forFeature([WorkingTime])],
  providers: [
    UserService, 
    {
      provide: 'SEQUELIZE',
      useExisting: Sequelize,
    },
    WorkingTimeService
  ],
  exports: [UserService, 'SEQUELIZE', WorkingTimeService, SequelizeModule],
})
export class UserModule { }
