import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TimeSheetService } from './timesheet.service';
import { Sequelize } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { TimeSheet } from './timesheet.model';
import { Project } from '../projects/project.model';
import { Task } from '../tasks/task.model';
import { ProjectTask } from '../projectTasks/projectTask.model';
import { ProjectUser } from '../projectUsers/projectUser.model';
import { PmProject } from '../pmProjects/pmProject.model';

@Module({
  imports: [SequelizeModule.forFeature([User, TimeSheet, Project, Task, ProjectTask, ProjectUser, PmProject])],
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
