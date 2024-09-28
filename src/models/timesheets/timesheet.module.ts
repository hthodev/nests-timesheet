import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../../models/user.model';
import { Sequelize } from 'sequelize-typescript';
import { TimeSheet } from 'models/timesheet.model';
import { Project } from 'models/project.model';
import { Task } from 'models/task.model';
import { TimeSheetService } from './timesheet.service';
import { TaskProject } from 'models/taskProject.model';
import { ProjectUser } from 'models/projectUser.model';
import { PmProject } from 'models/pmProject.model';

@Module({
  imports: [SequelizeModule.forFeature([User, TimeSheet, Project, Task, TaskProject, ProjectUser, PmProject])],
  providers: [
    {
      provide: 'SEQUELIZE',
      useExisting: Sequelize,
    },
    TimeSheetService
  ],
  exports: ['SEQUELIZE', SequelizeModule, TimeSheetService],
})
export class TimeSheetModule { }
