import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { Sequelize } from 'sequelize-typescript';
import { WorkingTimeService } from '../workingTimes/workingTime.service';
import { User } from './user.model';
import { WorkingTime } from '../workingTimes/workingTime.model';
import { Branch } from '../branches/branch.model';
import { ProjectUser } from '../projectUsers/projectUser.model';
@Module({
  imports: [SequelizeModule.forFeature([User, WorkingTime, Branch, ProjectUser])],
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
