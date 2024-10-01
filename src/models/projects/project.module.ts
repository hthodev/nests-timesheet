import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../../models/user.model';
import { Sequelize } from 'sequelize-typescript';
import { TimeSheet } from 'models/timesheet.model';
import { Project } from 'models/project.model';
import { Task } from 'models/task.model';
import { ProjectUser } from 'models/projectUser.model';
import { ProjectService } from './project.service';
import { ProjectTask } from 'models/projectTask.model';
import { PmProject } from 'models/pmProject.model';
import { Customer } from 'models/customer.model';

@Module({
  imports: [SequelizeModule.forFeature([User, TimeSheet, Project, Task, ProjectUser, ProjectTask, PmProject, Customer])],
  providers: [
    {
      provide: 'SEQUELIZE',
      useExisting: Sequelize,
    },
    ProjectService
  ],
  exports: ['SEQUELIZE', SequelizeModule, ProjectService],
})
export class ProjectModule { }
